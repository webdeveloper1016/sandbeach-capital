import { NumberDisplayModel } from '../ts/types';

export interface IexUrlModel {
  token: string;
  baseUrl: string;
}

export type IexUrlVariants = 'batch' | 'crypto';

export interface IexCryptoQuoteModel {
  symbol: string;
  latestPrice: string;
  latestUpdate: number;
}
export interface IexCryptoQuoteModelEnriched {
  api: IexCryptoQuoteModel;
  price: NumberDisplayModel;
  updatedAt: string;
}
export interface IexStockQuoteModel {
  symbol: string;
  latestPrice: number;
}
export interface IexFetchSimpleQuoteModel {
  stock: Record<string, IexStockQuoteModel>;
  crypto: Record<string, IexCryptoQuoteModelEnriched>;
  allData: unknown[];
}
