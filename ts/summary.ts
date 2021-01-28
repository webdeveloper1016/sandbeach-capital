import { NumberDisplayModel } from './types';

export interface AccountSummaryModel {
  portfolioTotal: NumberDisplayModel;
  exCryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotalExStable: NumberDisplayModel;
}
