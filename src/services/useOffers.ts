import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { tjekService, offerToProduct, DEALERS } from './TjekOfferService';
import { DEMO_PRODUCTS } from '../data/products';

export type OffersState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'live'; products: Product[]; fetchedAt: Date }
  | { status: 'demo'; products: Product[]; error: string };

/** Fetches this week's live Lidl offers and maps them to Product[]. */
export function useOffers(): OffersState {
  const [state, setState] = useState<OffersState>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    tjekService
      .getStoreOffers(DEALERS.LIDL_DK)
      .then((offers) => {
        if (cancelled) return;
        if (offers.length === 0) {
          setState({ status: 'demo', products: DEMO_PRODUCTS, error: 'No live offers returned — using demo data.' });
          return;
        }
        setState({ status: 'live', products: offers.map(offerToProduct), fetchedAt: new Date() });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        console.warn('[TjekOfferService] falling back to demo data:', msg);
        setState({ status: 'demo', products: DEMO_PRODUCTS, error: msg });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
