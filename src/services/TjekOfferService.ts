import type { TjekDealer, TjekCatalog, TjekOffer } from '../types/tjek';
import type { Product, ProductCategory } from '../types';

// ─── Config ────────────────────────────────────────────────────────────────────
// In dev Vite proxies /api/tjek → https://api.etilbudsavis.dk (no CORS).
// In production route through a Supabase Edge Function at the same path.
const BASE = '/api/tjek/v2';

// Known dealer IDs
export const DEALERS = {
  LIDL_DK: '71c90',
} as const;

// ─── HTTP helpers ──────────────────────────────────────────────────────────────
async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(BASE + path, window.location.origin);
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`TjekAPI ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Offer → Product mapper ────────────────────────────────────────────────────
function inferCategory(heading: string): ProductCategory {
  const h = heading.toLowerCase();
  if (/kylling|kalkun|oksek|svin|hakket|laks|tun|fisk|æg|kød|beef|chicken|turkey|pork|salmon|tuna|fish|egg/.test(h)) return 'Protein';
  if (/ris|pasta|kartof|brød|havre|tortilla|gryn|rice|bread|oat/.test(h)) return 'Carbs';
  if (/mælk|yogurt|skyr|ost|kvark|fløde|milk|cheese|dairy/.test(h)) return 'Dairy';
  if (/banan|æble|bær|grønt|spinat|broccoli|tomat|frugt|grønsag|berry|apple|vegetable|frozen/.test(h)) return 'Fruit & Vegetables';
  return 'Other';
}

function inferPricePerKg(offer: TjekOffer): number {
  const price = offer.pricing?.price ?? 0;
  const qty = offer.quantity;
  if (!qty || price === 0) return 0;

  // si.factor is the quantity in the SI unit (e.g. grams → kg)
  const factor = qty.unit?.si?.factor;
  if (factor && factor > 0) {
    const kgFactor = qty.unit?.si?.symbol === 'kg' ? factor : factor / 1000;
    return kgFactor > 0 ? price / kgFactor : 0;
  }
  // pieces fallback: price / amount
  const pcs = qty.pieces?.amount?.to ?? qty.pieces?.amount?.from ?? 1;
  return price / pcs;
}

export function offerToProduct(offer: TjekOffer): Product {
  return {
    id: offer.id,
    name: offer.heading,
    brand: '',
    store: 'Lidl',
    category: inferCategory(offer.heading),
    packageSize: offer.quantity?.unit?.si?.factor ?? offer.quantity?.size?.amount?.to ?? 0,
    packageUnit: offer.quantity?.unit?.si?.symbol ?? offer.quantity?.unit?.symbol ?? 'g',
    price: offer.pricing?.price ?? 0,
    regularPrice: offer.pricing?.pre_price ?? offer.pricing?.price ?? 0,
    pricePerKg: inferPricePerKg(offer),
    isDiscounted: Boolean(offer.pricing?.pre_price && offer.pricing.pre_price > (offer.pricing?.price ?? 0)),
    discountType: offer.pricing?.pre_price ? 'Weekly offer' : undefined,
    promotionStart: offer.run_from ? offer.run_from.slice(0, 10) : undefined,
    promotionEnd: offer.run_till ? offer.run_till.slice(0, 10) : undefined,
    // Nutrition unknown from Tjek — enriched via Supabase nutrition table later
    caloriesPer100g: 0,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 0,
  };
}

// ─── TjekOfferService ──────────────────────────────────────────────────────────
export class TjekOfferService {
  private catalogCache = new Map<string, { catalogs: TjekCatalog[]; fetchedAt: number }>();
  private readonly cacheTtlMs: number;

  constructor({ cacheTtlMs = 60 * 60 * 1000 } = {}) {
    // Default: cache catalogs 1 h (offers only change weekly)
    this.cacheTtlMs = cacheTtlMs;
  }

  // ── Public interface ──────────────────────────────────────────────────────────

  /** Fetch all chains/stores for a country (ISO-2, e.g. "DK") */
  async getStores(country = 'DK'): Promise<TjekDealer[]> {
    // API max is 100 per page; paginate to collect all dealers
    const all: TjekDealer[] = [];
    let offset = 0;
    while (true) {
      const page = await get<TjekDealer[]>('/dealers', { limit: '100', offset: String(offset) });
      all.push(...page);
      if (page.length < 100) break;
      offset += 100;
    }
    const dealers = all;
    return dealers.filter(d => !d.country || d.country.toUpperCase() === country.toUpperCase());
  }

  /** Fetch this week's live offers for a dealer by ID (e.g. DEALERS.LIDL_DK) */
  async getStoreOffers(dealerId: string): Promise<TjekOffer[]> {
    const catalogs = await this._getActiveCatalogs(dealerId);
    if (catalogs.length === 0) return [];

    // Fetch each catalog's offers in pages of 100 (API hard limit)
    const all: TjekOffer[] = [];
    for (const catalog of catalogs) {
      let offset = 0;
      const pageSize = 100;
      while (true) {
        const page = await get<TjekOffer[]>('/offers', {
          catalog_ids: catalog.id,
          limit: String(pageSize),
          offset: String(offset),
        });
        all.push(...page);
        if (page.length < pageSize) break;
        offset += pageSize;
      }
    }
    return all;
  }

  /**
   * Search offers by keyword across a country.
   * Falls back to fetching Lidl's full catalog and filtering locally when the
   * v2 search returns empty (common with Danish characters).
   */
  async searchOffers(query: string, country = 'DK'): Promise<TjekOffer[]> {
    const q = query.trim();
    if (!q) return [];

    // Attempt v2 search first
    try {
      const results = await get<TjekOffer[]>('/offers/search', {
        query: q,
        dealer_ids: DEALERS.LIDL_DK,
        limit: '24',
      });
      if (results.length > 0) return results;
    } catch {
      // fall through to local filter
    }

    // Local fallback: filter Lidl's current offers by heading/description
    const all = await this.getStoreOffers(DEALERS.LIDL_DK);
    const lower = q.toLowerCase();
    return all.filter(
      o =>
        o.heading.toLowerCase().includes(lower) ||
        o.description?.toLowerCase().includes(lower),
    );
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  private async _getActiveCatalogs(dealerId: string): Promise<TjekCatalog[]> {
    const now = Date.now();
    const cached = this.catalogCache.get(dealerId);
    if (cached && now - cached.fetchedAt < this.cacheTtlMs) return cached.catalogs;

    const catalogs = await get<TjekCatalog[]>('/catalogs', { dealer_ids: dealerId });
    this.catalogCache.set(dealerId, { catalogs, fetchedAt: now });
    return catalogs;
  }
}

// Singleton — shared across the app
export const tjekService = new TjekOfferService();
