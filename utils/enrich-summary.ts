import { currencyDisplay } from './calc';
import { EnrichedCryptoModel, AccountSummaryModel } from '../ts';

export const enrichSummary = (
  portfolioTotal: number,
  exCryptoPortfolioTotal: number,
  cryptoData: EnrichedCryptoModel,
): AccountSummaryModel => {
  return {
    portfolioTotal: currencyDisplay(portfolioTotal),
    exCryptoPortfolioTotal: currencyDisplay(exCryptoPortfolioTotal),
    cryptoPortfolioTotal: cryptoData.portfolioTotal,
    cryptoPortfolioTotalExStable: cryptoData.portfolioTotalExStable,
  };
};
