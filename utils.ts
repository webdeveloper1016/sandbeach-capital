import {
  SectorType,
  NumberDisplayModel,
  SectorWeightModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelExtended,
} from './types';

export const fetcher = (url) => fetch(url).then((res) => res.json());

const sectors: SectorType[] = ['Stocks', 'Bonds', 'Alts', 'Crypto', 'Cash'];

export const sumAccounts = (data: AccountModel[]): number =>
  data.reduce((accum, current) => accum + current.balance, 0);

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

export const flattenData = (data: PortfolioModel): AccountModel[] => {
  return Object.keys(data)
    .map((k) => {
      return data[k];
    })
    .flat();
};

export const sumBySector = (
  data: AccountModel[],
  value: SectorType,
): number => {
  // for each dataset, filter by the sector
  // then calc the value based on target percentage
  const vals = data.map((i) => {
    const inSector = i.pie.filter((i) => i.sector === value);
    const sums = inSector.reduce(
      (accum, current) => accum + current.targetPercent * i.balance,
      0,
    );
    return sums;
  });

  return vals.reduce((accum, current) => accum + current, 0);
};

export const calcSectorWeights = (
  data: AccountModel[],
  totalVal: number,
): SectorWeightModel[] => {
  return sectors.map((sector) => {
    const sectorSum = sumBySector(data, sector);
    return {
      sector,
      value: currencyDisplay(sectorSum),
      weight: percentDisplay(sectorSum, totalVal),
    };
  });
};

export const dataEnricher = (
  data: AccountModel[],
  sumCat: number,
  totalBalance: number,
): AccountModelExtended[] => {
  return data.map((i) => {
    return {
      ...i,
      value: currencyDisplay(i.balance),
      categoryWeight: percentDisplay(i.balance, sumCat),
      portfolioWeight: percentDisplay(i.balance, totalBalance),
      pie: i.pie.map((p) => ({
        ...p,
        approxVal: currencyDisplay(i.balance * p.targetPercent),
      })),
    };
  });
};

export const runAnalysis = (data: PortfolioModel): PortfolioModelExtended => {
  const flatData = flattenData(data);
  const sumST = sumAccounts(data.shortTerm);
  const sumLT = sumAccounts(data.longTerm);
  const sumR = sumAccounts(data.retirement);
  const totalBalance = sumST + sumLT + sumR;
  return {
    totalBalance: {
      val: totalBalance,
      display: currencyFormatter.format(totalBalance),
    },
    categorySummary: {
      shortTerm: {
        value: percentDisplay(sumST, totalBalance),
        balance: currencyDisplay(sumST),
        label: 'Short Term',
      },
      longTerm: {
        value: percentDisplay(sumLT, totalBalance),
        balance: currencyDisplay(sumLT),
        label: 'Long Term',
      },
      retirement: {
        value: percentDisplay(sumR, totalBalance),
        balance: currencyDisplay(sumR),
        label: 'Retirement',
      },
    },
    portfolioSectorWeights: calcSectorWeights(flatData, totalBalance),
    longTermRetireSectorWeights: calcSectorWeights(
      flatData.filter((i) => i.category !== 'short-term'),
      sumLT + sumR,
    ),
    shortTerm: {
      balance: currencyDisplay(sumST),
      categorySectorWeights: calcSectorWeights(data.shortTerm, sumST),
      data: dataEnricher(data.shortTerm, sumST, totalBalance),
    },
    longTerm: {
      balance: currencyDisplay(sumLT),
      categorySectorWeights: calcSectorWeights(data.longTerm, sumLT),
      data: dataEnricher(data.longTerm, sumLT, totalBalance),
    },
    retirement: {
      balance: currencyDisplay(sumR),
      categorySectorWeights: calcSectorWeights(data.retirement, sumR),
      data: dataEnricher(data.retirement, sumR, totalBalance),
    },
  };
};
