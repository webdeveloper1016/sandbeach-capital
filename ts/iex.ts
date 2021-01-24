import { NumberDisplayModel } from '../ts/types';

export interface IexUrlModel {
  env: 'Live' | 'Sandbox';
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

export type IexQuoteModelEnriched =
  | IexCryptoQuoteModelEnriched
  | IexStockQuoteModelEnriched;
  
export interface IexFetchSimpleQuoteModel {
  stock: Record<string, IexStockQuoteModelEnriched>;
  crypto: Record<string, IexCryptoQuoteModelEnriched>;
  allData: unknown[];
}

export type IexSimpleQuoteModel = Record<string, IexStockQuoteModelEnriched>
