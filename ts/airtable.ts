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
  // | 'betterment-emergency'
  | 'm1-taxable'
  | 'm1-income'
  | 'robinhood-core'
  | 'robinhood-moon'
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
  subAssetClass: CryptoAssetClassType;
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
  excludeFromAnalysis?: boolean;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: StockAssetClassType;
  subAssetClass: StockAssetClassType;
  sector: string;
  shares: number;
  targetPercent?: number;
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
  nicknameId: {
    nickname: string;
    id: string;
  };
  pie: AirTablePieModelExtended[];
  pieSlim: AirTablePieModelExtended[];
  pieSlimTopOnly: boolean;
  pieSlimTopOnlyCount: number;
  totalValue: NumberDisplayModel;
  weight: NumberDisplayModel;
}
