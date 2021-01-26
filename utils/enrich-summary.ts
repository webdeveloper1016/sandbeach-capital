import { currencyDisplay } from './calc';
import { EnrichedCryptoModel } from '../ts';

export const enrichSummary = (
  portfolioTotal: number,
  exCryptoPortfolioTotal: number,
  cryptoData: EnrichedCryptoModel,
) => {
  return {
    portfolioTotal: currencyDisplay(portfolioTotal),
    exCryptoPortfolioTotal: currencyDisplay(exCryptoPortfolioTotal),
    cryptoPortfolioTotal: cryptoData.portfolioTotal,
    cryptoPortfolioTotalExStable: cryptoData.portfolioTotalExStable,
  };
};
