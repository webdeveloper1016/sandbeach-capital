export type CategoryType = 'short-term' | 'long-term' | 'retirement';

export type AssetClassType = 'Stocks' | 'Bonds' | 'Alts' | 'Crypto' | 'Cash';

export type SectorType =
  | 'US Stocks'
  | 'Tech Stocks'
  | 'Foreign Stocks'
  | 'EMG Market Stocks'
  | 'Global Stock Mix'
  | 'Global Bond Mix'
  | 'Alts Mix'
  | 'REIT'
  | 'Crypto'
  | 'Stablecoin'
  | 'Commodity'
  | 'Cash'
  | 'Other';

export type StrategyType =
  | 'Individual Stocks'
  | 'Growth'
  | 'Value'
  | 'Income'
  | 'Hedge Fund Follow'
  | 'Real Estate'
  | 'Other';

export type ApproachType =
  | 'Individual Stocks'
  | 'ETF'
  | 'Mutual Fund'
  | 'Robo'
  | 'Self Directed'
  | 'Advisor'
  | 'Other';

export type CoinType = 'BTC' | 'ETH' | 'GUSD' | 'USDC';

export interface NumberDisplayModel {
  val: number;
  display: string;
}

export interface SectorWeightModel {
  assetClass: AssetClassType;
  value: NumberDisplayModel;
  weight: NumberDisplayModel;
}

export interface ValueWeightModel {
  label: string;
  value: NumberDisplayModel;
  weight: NumberDisplayModel;
}

export interface PieModel {
  nickname: string;
  targetPercent: number;
  assetClass: AssetClassType;
  sector: SectorType | StrategyType;
}

export interface AccountModel {
  account: string;
  institution: string;
  goal: string;
  timeHorizon: string;
  category: CategoryType;
  approach: ApproachType;
  risk: 1 | 2 | 3 | 4 | 5;
  balance: number;
  biWeeklySavings?: number;
  pie: PieModel[];
}

export interface PieModelExtended extends PieModel {
  approxVal: NumberDisplayModel;
  targetPercentDisplay: NumberDisplayModel;
}

export interface AccountModelExtended extends AccountModel {
  categoryWeight?: NumberDisplayModel;
  portfolioWeight?: NumberDisplayModel;
  categoryLabel: string;
  value: NumberDisplayModel;
  pie: PieModelExtended[];
}

export interface PortfolioModel {
  shortTerm: AccountModel[];
  longTerm: AccountModel[];
  retirement: AccountModel[];
}

export interface PortfolioModelExtended {
  totalBalance: NumberDisplayModel;
  categorySummary: ValueWeightModel[];
  portfolioSectorWeights: SectorWeightModel[];
  longTermRetireSectorWeights: SectorWeightModel[];
  shortTerm: {
    balance: NumberDisplayModel;
    categorySectorWeights: SectorWeightModel[];
    data: AccountModelExtended[];
  };
  longTerm: {
    balance: NumberDisplayModel;
    categorySectorWeights: SectorWeightModel[];
    data: AccountModelExtended[];
  };
  retirement: {
    balance: NumberDisplayModel;
    categorySectorWeights: SectorWeightModel[];
    data: AccountModelExtended[];
  };
}

export interface InsightsModel {
  globalSplit: {
    us: ValueWeightModel;
    foreign: ValueWeightModel;
  };
}
export interface PortfolioModelEnriched extends PortfolioModelExtended {
  allAccounts: AccountModelExtended[];
  insights: InsightsModel;
}

export interface QuotesModel {
  quote: string;
}

export interface SavingsGoalModel {
  annualIncome: number;
  preTaxSavingsPercent: number;
  goalStatements?: {
    goal: string;
  }[];
  biWeeklySavingsTotal: number;
}
