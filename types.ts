export type SectorType =
  | 'US Stock'
  | 'Intl Stock'
  | 'US Bond'
  | 'Intl Bond'
  | 'Alternative'
  | 'ETF'
  | 'Mutual Fund'
  | 'Robo'
  | 'M1'
  | 'Cash';

export type SubSectorType =
  | 'US stock'
  | 'Tech stock'
  | 'International stock'
  | 'EMG market stock'
  | 'Us Govt bond'
  | 'Foreign Bond'
  | 'EMG bond'
  | 'Corporate bond'
  | 'Hedge fund'
  | 'Hedge fund follow'
  | 'Private equity'
  | 'VC'
  | 'Pre IPO'
  | 'Income share'
  | 'Real estate'
  | 'Reit'
  | 'Art'
  | 'Currency'
  | 'Crypto'
  | 'Commodity'
  | 'Cash';

export interface PortfolioModel {
  category: 'short-term' | 'long-term' | 'retirement';
  sector: SectorType;
  subSector?: SubSectorType;
  pie?: { slice: SubSectorType; percentage: number }[];
  amount: number
}

// style: 'ETF',
// strategy: cash, income, value, growth, hedge, alt
// ticker: 'QQQ',
// fees: 0.2,
// shares: 133,
// amount: 38000,
// yield: 0.55
