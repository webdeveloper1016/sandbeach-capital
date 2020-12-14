import {
  AssetClassType,
  CategoryType,
  NumberDisplayModel,
  SectorWeightModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelExtended,
} from '../ts/types';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const assetClasses: AssetClassType[] = [
  'Stocks',
  'Bonds',
  'Alts',
  'Crypto',
  'Cash',
];

export const categories: CategoryType[] = [
  'short-term',
  'long-term',
  'retirement',
];

export const categoryLabels: Record<CategoryType, string> = {
  'short-term': 'Short Term',
  'long-term': 'Long Term',
  'retirement': 'Retirement',
}

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

export const sumByAsset = (
  data: AccountModel[],
  value: AssetClassType,
): number => {
  // for each dataset, filter by the sector
  // then calc the value based on target percentage
  const vals = data.map((i) => {
    const inAsset = i.pie.filter((i) => i.assetClass === value);
    const sums = inAsset.reduce(
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
  return assetClasses.map((sector) => {
    const sum = sumByAsset(data, sector);
    return {
      assetClass: sector,
      value: currencyDisplay(sum),
      weight: percentDisplay(sum, totalVal),
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
      categoryLabel: categoryLabels[i.category],
      pie: i.pie.map((p) => ({
        ...p,
        approxVal: currencyDisplay(i.balance * p.targetPercent),
        targetPercentDisplay: percentDisplay(p.targetPercent, 1)
      })),
    };
  });
};

export const runInitialAnalysis = (
  data: PortfolioModel,
): PortfolioModelExtended => {
  // group and sum data
  const flatData = flattenData(data);
  const sumST = sumAccounts(data.shortTerm);
  const sumLT = sumAccounts(data.longTerm);
  const sumR = sumAccounts(data.retirement);
  const totalBalance = sumST + sumLT + sumR;

  // build out analysis object
  return {
    totalBalance: {
      val: totalBalance,
      display: currencyFormatter.format(totalBalance),
    },
    categorySummary: categories.map((c) => {
      let sum = 0;
      let label = '';
      switch (c) {
        case 'short-term':
          sum = sumST;
          label = 'Short Term';
          break;
        case 'long-term':
          sum = sumLT;
          label = 'Long Term';
          break;
        case 'retirement':
          sum = sumR;
          label = 'Retirement';
          break;
        default:
          break;
      }

      return {
        value: currencyDisplay(sum),
        weight: percentDisplay(sum, totalBalance),
        label,
      };
    }),
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
    allAccounts: [],
  };
};

export const runAnalysis = (
  data: PortfolioModel,
): PortfolioModelExtended => {
  const initialAnalysis = runInitialAnalysis(data)
  return {
    ...initialAnalysis,
    allAccounts: [
      ...initialAnalysis.shortTerm.data,
      ...initialAnalysis.longTerm.data,
      ...initialAnalysis.retirement.data,
    ],
  };
};
