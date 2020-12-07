export type CategoryType = 'short-term' | 'long-term' | 'retirement';

export type SectorType = 'Stocks' | 'Bonds' | 'Alts' | 'Crypto' | 'Cash';

export type SubSectorType =
  | 'Domestic stocks'
  | 'Tech stocks'
  | 'Foreign stocks'
  | 'EMG market stocks'
  | 'Domestic/Foreign mix stocks'
  | 'US Govt bond'
  | 'Foreign Bond'
  | 'EMG bond'
  | 'Corporate bond'
  | 'Muni Bond'
  | 'MBS Bond'
  | 'Junk Bond'
  | 'Domestic/Foreign mix bonds'
  | 'REIT'
  | 'Art'
  | 'Currency'
  | 'Crypto'
  | 'Commodity'
  | 'Cash'
  | 'Other';

export type StrategyType =
  | 'Individual Stocks'
  | 'Growth'
  | 'Value'
  | 'Income'
  | 'Hedge fund'
  | 'Hedge fund follow'
  | 'Private equity'
  | 'VC'
  | 'Pre IPO'
  | 'Income share'
  | 'Real estate'
  | 'Other';

export type ApproachType =
  | 'Individual Stocks'
  | 'ETF'
  | 'Mutual Fund'
  | 'Robo'
  | 'Self Directed'
  | 'Advisor'
  | 'Other';

export interface NumberDisplayModel {
  val: number;
  display: string;
}

export interface SectorWeightModel {
  sector: SectorType;
  value: NumberDisplayModel;
  weight: NumberDisplayModel;
}

export interface PieModel {
  nickname: string;
  targetPercent: number;
  sector: SectorType;
  subSector: SubSectorType | StrategyType;
}

export interface AccountModel {
  account: string;
  institution: string;
  goal: string;
  timeHorizon: string;
  category: CategoryType;
  approach: ApproachType;
  balance: number;
  pie: PieModel[];
}

export interface PieModelExtended extends PieModel {
  approxVal: NumberDisplayModel;
}

export interface AccountModelExtended extends AccountModel {
  categoryWeight?: NumberDisplayModel;
  portfolioWeight?: NumberDisplayModel;
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
  categoryPercents: {
    shortTerm: NumberDisplayModel;
    longTerm: NumberDisplayModel;
    retirement: NumberDisplayModel;
  };
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
