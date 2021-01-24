import { AssetClassType } from './types'

export type AirTableTablesType = 'Crypto' | 'Stocks' | 'Watchlist' | 'Accounts' | 'Pies';

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
  balance?: number;
  contribution?: number;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: AssetClassType;
  sector: string;
  symbol?: string;
  shares?: number;
}
