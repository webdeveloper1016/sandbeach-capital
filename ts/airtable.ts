import { StockAssetClassType, CryptoAssetClassType } from './types';

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
  assetClass: CryptoAssetClassType;
}

export interface AirTableCryptoModelExtended extends AirTableCryptoModel {
  sliceTotalValue: number;
}

export interface AirTableAccountModel {
  id: string;
  nickname: string;
  institution: string;
  timeframe: string;
  contribution?: number;
  crypto?: boolean;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: StockAssetClassType;
  sector: string;
  shares: number;
  symbol?: string;
}

export interface AirTablePieModelExtended extends AirTablePieModel {
  sliceTotalValue: number;
}

export interface AirTableAccountModelExtended extends AirTableAccountModel {
  pie: AirTablePieModelExtended[];
  totalValue: number;
}
