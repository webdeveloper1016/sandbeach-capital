import { NumberDisplayModel, PercChangeModel } from '../ts/types';

export interface IexUrlModel {
  env: 'Live' | 'Sandbox';
  token: string;
  baseUrl: string;
}

export type IexUrlVariants = 'batch' | 'batch-logo';

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
  companyName: string;
  open: number;
  high: number;
  low: number;
  close: number;
  latestPrice: number;
  latestUpdate: number;
  previousClose: number;
  previousVolume: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio: number | null;
  week52High: number;
  week52Low: number;
  ytdChange: number;
}

export interface IexBatchRequestDetailed {
  quote: IexStockQuoteModel;
  logo: {
    url: string;
  };
}

export interface IexStockQuoteModelEnriched {
  api: IexStockQuoteModel;
  price: NumberDisplayModel;
  updatedAt: string;
}

export interface IexStockQuoteDetailedModelEnriched {
  symbol: string;
  companyName: string;
  shares: number;
  equity: NumberDisplayModel;
  weight: NumberDisplayModel;
  prices: {
    previousClose: NumberDisplayModel;
    open: NumberDisplayModel;
    high: NumberDisplayModel;
    low: NumberDisplayModel;
    close: NumberDisplayModel;
    latest: NumberDisplayModel;
  };
  volume: {
    prev: NumberDisplayModel;
    current: NumberDisplayModel;
  };
  change: NumberDisplayModel;
  changePercent: PercChangeModel;
  equityPrevClose: NumberDisplayModel;
  logo: string;
  tags: string[];
  sector: string;
  stats: {
    marketCap: NumberDisplayModel;
    peRatio: number | null;
    week52High: NumberDisplayModel;
    week52Low: NumberDisplayModel;
    ytdChange: NumberDisplayModel;
    week52Range: string;
    week52OffHighPercent: NumberDisplayModel;
  };
}

export interface EnrichedDetailedQuoteModel {
  summary: {
    balance: NumberDisplayModel;
    prevBalance: NumberDisplayModel;
    dayChange: PercChangeModel;
  };
  quotes: IexStockQuoteDetailedModelEnriched[];
}

export type IexQuoteModelEnriched =
  | IexCryptoQuoteModelEnriched
  | IexStockQuoteModelEnriched;

export interface IexFetchSimpleQuoteModel {
  stock: Record<string, IexStockQuoteModelEnriched>;
  crypto: Record<string, IexCryptoQuoteModelEnriched>;
  allData: unknown[];
}

export type IexSimpleQuoteModel = Record<string, IexStockQuoteModelEnriched>;

export type IexDetailedQuoteModel = Record<string, IexBatchRequestDetailed>;
