import { currencyDisplay } from './calc';
import { CMCEnrichedCryptoModel, AccountSummaryModel } from '../ts';

export const enrichSummary = (
  portfolioTotal: number,
  exCryptoPortfolioTotal: number,
  cryptoData: CMCEnrichedCryptoModel,
): AccountSummaryModel => {
  return {
    portfolioTotal: currencyDisplay(portfolioTotal),
    exCryptoPortfolioTotal: currencyDisplay(exCryptoPortfolioTotal),
    cryptoPortfolioTotal: cryptoData.portfolioTotal,
    cryptoPortfolioTotalExStable: cryptoData.portfolioTotalExStable,
    btcLast: cryptoData.coins.find((c) => c.slug === 'bitcoin'),
  };
};
