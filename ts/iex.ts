import { NumberDisplayModel, PercChangeModel } from './types';
import { AirTableAccountModelExtended } from './airtable';
export interface IexUrlModel {
  env: 'Live' | 'Sandbox';
  token: string;
  baseUrl: string;
}

export type IexUrlVariants = 'batch' | 'batch-logo' | 'batch-stats';

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
  logo?: {
    url: string;
  };
}

export interface IexStockQuoteModelEnriched {
  api: IexStockQuoteModel;
  price: NumberDisplayModel;
  updatedAt: string;
}

export interface IexStockQuoteDetailedModel {
  symbol: string;
  companyName: string;
  symbolCompany: {
    symbol: string;
    name: string;
  };
  shares: number;
  sharesDisplay: NumberDisplayModel;
  equity: NumberDisplayModel;
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
  stats: {
    marketCap: NumberDisplayModel;
    peRatio: number | null;
    week52High: NumberDisplayModel;
    week52Low: NumberDisplayModel;
    ytdChange: PercChangeModel;
    week52Range: string;
    week52OffHighPercent: PercChangeModel;
  };
}

export interface IexStockQuoteDetailedModelEnriched
  extends IexStockQuoteDetailedModel {
  weight: NumberDisplayModel;
  logo: string | null;
  tags?: string[];
  sector?: string;
  accounts?: string[];
  accountsJoined?: string;
  rank?: number;
  exclude?: boolean;
  targetPercent?: NumberDisplayModel;
  slicePercent?: NumberDisplayModel;
}

export interface MenuItemModel {
  nickname: string;
  id: string;
}
export interface EnrichedDetailedQuoteModel {
  menuItems: MenuItemModel[];
  account: AirTableAccountModelExtended;
  summary: {
    balance: NumberDisplayModel;
    prevBalance: NumberDisplayModel;
    dayChange: PercChangeModel;
    weight: {
      tgt: NumberDisplayModel;
      actual: NumberDisplayModel;
    } | null;
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

// export type IexDetailedQuoteModel = Record<string, IexStockQuoteModel>;
