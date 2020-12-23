import { PortfolioModel, MarketDataModel, TickerModel } from '../ts/types';

export const extractTickers = (data: PortfolioModel): TickerModel => {
  const piesWithTickers: MarketDataModel[] = [
    ...data.accounts.shortTerm,
    ...data.accounts.longTerm,
    ...data.accounts.retirement,
  ]
    .map((a) => a.pie)
    .flat()
    .filter((p) => p.marketData)
    .map((m) => m.marketData);

  return {
    stock: [
      ...new Set(
        piesWithTickers
          .filter((m) => m.market === 'stock')
          .map((t) => t.ticker),
      ),
    ],
    crypto: [
      ...new Set(
        piesWithTickers
          .filter((m) => m.market === 'crypto')
          .map((t) => t.ticker),
      ),
    ],
  };
};
