import { NumberDisplayModel } from './types';
import { CoinMarketCapAssetModel } from './cmc';

export interface AccountSummaryModel {
  portfolioTotal: NumberDisplayModel;
  exCryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotal: NumberDisplayModel;
  cryptoPortfolioTotalExStable: NumberDisplayModel;
  btcLast: CoinMarketCapAssetModel;
}
