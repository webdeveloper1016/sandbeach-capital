import {
  NumberDisplayModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelExtended,
} from './types';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const sumAccounts = (data: AccountModel[]): number =>
  data.reduce((accum, current) => accum + current.amount, 0);

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const percentFormatter = (a, b): string =>
  `${Math.round((a / b) * 100 * 100) / 100}%`;

export const percentDisplay = (a, b): NumberDisplayModel => ({
  val: a / b,
  display: percentFormatter(a, b),
});

export const currencyDisplay = (a): NumberDisplayModel => ({
  val: a,
  display: currencyFormatter.format(a),
});

export const dataEnricher = (
  data: AccountModel[],
  sumCat: number,
  netWorth: number,
): AccountModelExtended[] => {
  return data.map((i) => {
    return {
      ...i,
      value: currencyDisplay(i.amount),
      categoryWeight: percentDisplay(i.amount, sumCat),
      portfolioWeight: percentDisplay(i.amount, netWorth),
    };
  });
};

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
      shortTerm: percentDisplay(sumST, netWorth),
      longTerm: percentDisplay(sumLT, netWorth),
      retirement: percentDisplay(sumR, netWorth),
    },
    shortTerm: {
      sum: currencyDisplay(sumST),
      data: dataEnricher(data.shortTerm, sumST, netWorth),
    },
    longTerm: {
      sum: currencyDisplay(sumLT),
      data: dataEnricher(data.longTerm, sumLT, netWorth),
    },
    retirement: {
      sum: currencyDisplay(sumR),
      data: dataEnricher(data.retirement, sumR, netWorth),
    },
  };
};
