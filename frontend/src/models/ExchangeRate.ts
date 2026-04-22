export interface ExchangeRate {
  pair: string;
  description: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  variation: number;
  variationPercent: number;
  timestamp: string;
}

export interface CurrencySnapshot {
  rates: ExchangeRate[];
  fetchedAt: Date;
}
