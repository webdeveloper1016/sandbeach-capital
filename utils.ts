import { AccountModel, PortfolioModel, PortfolioModelExtended } from './types';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const sumAccounts = (data: AccountModel[]): number =>
  data.reduce((accum, current) => accum + current.amount, 0);

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const runAnalysis = (data: PortfolioModel): PortfolioModelExtended => {
  const sumST = sumAccounts(data.shortTerm);
  const sumLT = sumAccounts(data.longTerm);
  const sumR = sumAccounts(data.retirement);
  const netWorth = sumST + sumLT + sumR;
  return {
    netWorth: {
      val: netWorth,
      display: currencyFormatter.format(netWorth),
    },
    categoryPercents: {
      shortTerm: `${Math.round((sumST / netWorth) * 100 * 100) / 100}%`,
      longTerm: `${Math.round((sumLT / netWorth) * 100 * 100) / 100}%`,
      retirement: `${Math.round((sumR / netWorth) * 100 * 100) / 100}%`,
    },
    shortTerm: {
      sum: sumST,
      data: data.shortTerm.map(i => {
        return {
          ...i,
          categoryWeight: '',
          portfolioWeight: '',
        }
      })
    },
    longTerm: {
      sum: sumLT,
      data: data.longTerm,
    },
    retirement: {
      sum: sumR,
      data: data.retirement,
    },
  };
};
