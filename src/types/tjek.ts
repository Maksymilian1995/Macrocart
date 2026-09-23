export interface TjekDealer {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  color?: string;
  pageflip?: { logo?: string; color?: string };
  country?: string;
  category_ids?: string[];
}

export interface TjekCatalog {
  id: string;
  label?: string;
  dealer_id: string;
  dealer_url?: string;
  dealer?: TjekDealer;
  run_from: string;
  run_till: string;
  offer_count: number;
  background_color?: string;
  background?: { id?: string };
  images?: { thumb?: string; view?: string; zoom?: string };
  category_ids?: string[];
  store_ids?: string[];
}

export interface TjekPricing {
  price: number;
  pre_price?: number | null;
  currency: string;
}

export interface TjekQuantityUnit {
  si?: { factor: number; symbol: string };
  symbol?: string;
}

export interface TjekQuantity {
  unit?: TjekQuantityUnit;
  pieces?: { amount?: { from?: number; to?: number } };
  size?: { amount?: { from?: number; to?: number }; unit?: TjekQuantityUnit };
}

export interface TjekOffer {
  id: string;
  heading: string;
  description?: string;
  catalog_page?: number;
  catalog_id: string;
  dealer_id: string;
  dealer_url?: string;
  store_id?: string;
  run_from: string;
  run_till: string;
  publish_time?: string;
  pricing?: TjekPricing;
  quantity?: TjekQuantity;
  images?: { thumb?: string; view?: string; zoom?: string };
  branding?: { logo?: string; color?: string };
  category_ids?: string[];
}

export interface TjekOffersResponse {
  results?: TjekOffer[];
  data?: TjekOffer[];
}
