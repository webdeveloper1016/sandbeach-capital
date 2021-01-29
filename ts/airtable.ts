import {
  StockAssetClassType,
  CryptoAssetClassType,
  NumberDisplayModel,
} from './types';

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
  sliceTotalValue: NumberDisplayModel;
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
  sliceTotalValue: NumberDisplayModel;
}

export interface AirTableAccountModelExtended extends AirTableAccountModel {
  pie: AirTablePieModelExtended[];
  totalValue: NumberDisplayModel;
  weight: NumberDisplayModel;
}
