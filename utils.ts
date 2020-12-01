import { AccountModel, PortfolioModel, PortfolioModelExtended } from './types';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const sumAccounts = (data: AccountModel[]): number =>
  data.reduce((accum, current) => accum + current.amount, 0);

export const runAnalysis = (data: PortfolioModel): PortfolioModelExtended => {
  const sumST = sumAccounts(data.shortTerm);
  const sumLT = sumAccounts(data.longTerm);
  const sumR = sumAccounts(data.retirement);
  const netWorth = sumST + sumLT + sumR;
  return {
    netWorth,
    shortTerm: {
      sum: sumST,
      data: data.shortTerm,
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
