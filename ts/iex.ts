export interface IexUrlModel {
  token: string;
  baseUrl: string;
}

export type IexUrlVariants = 'batch' | 'crypto';

export interface IexCryptoQuoteModel {
  symbol: string;
  latestPrice: string;
}
export interface IexStockQuoteModel {
  symbol: string;
  latestPrice: number;
}
export interface IexFetchSimpleQuoteModel {
  stock: Record<string, IexStockQuoteModel>;
  crypto: Record<string, IexCryptoQuoteModel>;
  allData: unknown[];
}
