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

export type AirTableStockAccounts =
  | 'm1-emergency'
  | 'm1-taxable'
  | 'bryan-roth';

export type AirTableCryptoAccounts = 'crypto';

export type AirTableAccountRoutes =
  | AirTableStockAccounts
  | AirTableCryptoAccounts;

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
  sliceWeight: NumberDisplayModel;
}

export interface AirTableAccountModel {
  id: string;
  nickname: string;
  institution: string;
  timeframe: string;
  contribution?: number;
  annualContribution: number;
  crypto?: boolean;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: StockAssetClassType;
  sector: string;
  shares: number;
  symbol?: string;
  risk: number;
  factors?: string[];
  tags?: string[];
}

export interface AirTablePieModelExtended extends AirTablePieModel {
  sliceTotalValue: NumberDisplayModel;
  sliceWeight: NumberDisplayModel;
}

export interface AirTableAccountModelExtended extends AirTableAccountModel {
  pie: AirTablePieModelExtended[];
  pieSlim: AirTablePieModelExtended[];
  pieSlimTopOnly: boolean;
  pieSlimTopOnlyCount: number;
  totalValue: NumberDisplayModel;
  weight: NumberDisplayModel;
}
