import {
  StockAssetClassType,
  CryptoAssetClassType,
  NumberDisplayModel,
} from './types';

export type AirTableTablesType =
  | 'Accounts'
  | 'Pies'
  | 'Crypto'
  | 'Config'
  | 'Historical'
  | 'Transactions';

export interface AirTableCryptoModel {
  id: string;
  account: string;
  symbol: string;
  coin: string;
  amount: number;
  assetClass: CryptoAssetClassType;
  subAssetClass: CryptoAssetClassType;
  targetPercent?: number;
}

export interface AirTableCryptoModelExtended extends AirTableCryptoModel {
  sliceTotalValue: NumberDisplayModel;
  sliceWeight: NumberDisplayModel;
}

export interface AirTableAccountModel {
  id: string;
  nickname: string;
  institution: string;
  description?: string;
  timeframe: string;
  contribution?: number;
  annualContribution: number;
  crypto?: boolean;
  excludeFromAnalysis?: boolean;
  barbellWeights?: number;
  parentAccount?: boolean;
  showInAccountsMenu?: boolean;
}

export interface AirTablePieModel {
  id: string;
  account: string;
  assetClass: StockAssetClassType;
  subAssetClass: StockAssetClassType;
  sector: string;
  shares: number;
  targetPercent?: number;
  slicePercent?: number;
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

export interface AirTableConfigModel {
  key: string;
  value: string;
  type: 'number' | 'string';
}

export interface AirTableConfigModelExtended {
  btcGoalShort: number;
  btcGoalLong: number;
  ethGoalLong: number;
  ethGoalShort: number;
  taxableEquitiesGoal: number;
  portfolioValueGoal: number;
}

export interface AirTableTransactionsModel {
  timestamp: string;
  type: string;
  asset: string;
  quantity: number;
  price: number;
  total: number;
  fees: number;
  exchange: string;
  notes: string;
}

export interface AirTableAllTables {
  accounts: AirTableAccountModel[];
  crypto: AirTableCryptoModel[];
  pies: AirTablePieModel[];
  config: AirTableConfigModel[];
  transactions: AirTableTransactionsModel[]
}
