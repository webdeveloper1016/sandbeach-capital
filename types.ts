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

export interface AccountModel {
  account: string;
  category: CategoryType;
  approach: ApproachType;
  amount: number;
  pie: {
    nickname: string;
    targetPercent: number;
    sector: SectorType;
    subSector: SubSectorType | StrategyType;
  }[];
}

export interface AccountModelExtended extends AccountModel {
  categoryWeight?: string
  portfolioWeight?: string
}

export interface PortfolioModel {
  shortTerm: AccountModel[];
  longTerm: AccountModel[];
  retirement: AccountModel[];
}

export interface PortfolioModelExtended {
  netWorth: {
    val: number
    display: string
  }
  categoryPercents: {
    shortTerm: string
    longTerm: string
    retirement: string
  }
  shortTerm: {
    sum: number
    data: AccountModelExtended[]
  },
  longTerm: {
    sum: number
    data: AccountModelExtended[]
  }
  retirement: {
    sum: number
    data: AccountModelExtended[]
  }
}
