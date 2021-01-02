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
  latestUpdate: number;
}

export interface IexStockQuoteModelEnriched {
  api: IexStockQuoteModel;
  price: NumberDisplayModel;
  updatedAt: string;
}
export interface IexFetchSimpleQuoteModel {
  stock: Record<string, IexStockQuoteModelEnriched>;
  crypto: Record<string, IexCryptoQuoteModelEnriched>;
  allData: unknown[];
}
