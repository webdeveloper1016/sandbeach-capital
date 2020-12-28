export type CategoryType = 'short-term' | 'long-term' | 'retirement';

export type AssetClassType = 'Stocks' | 'Bonds' | 'Alts' | 'Crypto' | 'Cash';

export type FactorTypes =
  | 'growth'
  | 'active'
  | 'speculative'
  | 'tech'
  | 'income'
  | 'esg'
  | 'quality'
  | 'momentum'
  | 'smallcap'
  | 'intl';

export type SectorType =
  | 'US Stocks'
  | 'Foreign Stocks'
  | 'EMG Market Stocks'
  | 'Global Stock Mix'
  | 'US Bonds'
  | 'Global Bond Mix'
  | 'Foreign Bonds'
  | 'Alts Mix'
  | 'REIT'
  | 'Crypto'
  | 'Stablecoin'
  | 'Commodity'
  | 'Cash'
  | 'Other';

export type StrategyType =
  | 'Growth'
  | 'Income'
  | 'Value'
  | 'Tech'
  | 'Intl'
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

export type SectorStrategyType = SectorType | StrategyType;

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

export interface SliceDetailsAnalysisModel extends ValueWeightModel {
  assetClassWeight?: NumberDisplayModel;
  assetClass?: AssetClassType;
}

export interface MarketDataModel {
  ticker: string;
  shares: number;
  market: 'stock' | 'crypto';
}

export interface TickerModel {
  stock: string[];
  crypto: string[];
}

export interface PieModel {
  nickname: string;
  targetPercent: number;
  assetClass: AssetClassType;
  sector: SectorStrategyType;
  sliceDetails?: { [key in FactorTypes]?: number };
  marketData?: MarketDataModel[];
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
  biWeeklySavings: number;
  active?: boolean;
  preTax?: boolean;
  pie: PieModel[];
}

export interface PieModelExtended extends PieModel {
  approxVal: NumberDisplayModel;
  targetPercentDisplay: NumberDisplayModel;
  metadata: AccountModel;
}

export interface AccountModelExtended extends AccountModel {
  categoryWeight?: NumberDisplayModel;
  portfolioWeight?: NumberDisplayModel;
  categoryLabel: string;
  value: NumberDisplayModel;
  pie: PieModelExtended[];
}

export interface PortfolioAccountModelExtended {
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
  globalSplit: ValueWeightModel[];
  riskSplit: ValueWeightModel[];
  activeSplit: ValueWeightModel[];
  sliceDetails: ValueWeightModel[];
}

export interface PortfolioAccountModelEnriched
  extends PortfolioAccountModelExtended {
  allAccounts: AccountModelExtended[];
  allPies: PieModelExtended[];
  insights: InsightsModel;
}

export interface QuotesModel {
  quote: string;
}

export interface SavingsGoalModel {
  annualIncome: number;
  preTaxSavingsPercent: number;
  goalStatements: {
    goal: string;
  }[];
  biWeeklySavingsGoal: number;
  unscheduledContributions: number;
}

export interface PortfolioAccountModel {
  shortTerm: AccountModel[];
  longTerm: AccountModel[];
  retirement: AccountModel[];
}

export interface PortfolioGoalsModel {
  quotes: QuotesModel[];
  savings: SavingsGoalModel;
}

export interface PortfolioGoalsModelEnriched extends PortfolioGoalsModel {
  savingsAnalysis: ValueWeightModel[];
}

// this is returned by the API
export interface PortfolioModel {
  accounts: PortfolioAccountModel;
  goals: PortfolioGoalsModel;
}

// this is return by react-query
export interface PortfolioModelExtended {
  accounts: PortfolioAccountModelEnriched;
  goals: PortfolioGoalsModelEnriched;
}
