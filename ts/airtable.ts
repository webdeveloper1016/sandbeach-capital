import { AssetClassType } from './types';

export type AirTableTablesType =
  | 'Crypto'
  | 'Stocks'
  | 'Watchlist'
  | 'Accounts'
  | 'Pies';

export interface AirTableCryptoModel {
  id: string;
  account: string;
  symbol: string;
  coin: string;
  amount: number;
  stablecoin?: boolean;
}

export interface AirTableAccountModel {
  id: string;
  nickname: string;
  institution: string;
  timeframe: string;
  contribution?: number;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: AssetClassType;
  sector: string;
  shares: number;
  symbol?: string;
}
