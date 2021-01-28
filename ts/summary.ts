import { NumberDisplayModel } from './types';
import { CoinCapAssetModel } from './coincap';

export interface AccountSummaryModel {
  portfolioTotal: NumberDisplayModel;
  exCryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotalExStable: NumberDisplayModel;
  btcLast: CoinCapAssetModel;
}
