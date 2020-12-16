import {
  AssetClassType,
  CategoryType,
  NumberDisplayModel,
  SectorWeightModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelExtended,
  PortfolioModelEnriched,
} from '../ts/types';
import {
  sumAccounts,
  currencyFormatter,
  percentDisplay,
  currencyDisplay,
} from './calc';
import { calcGlobalSplit } from './insights';

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
  retirement: 'Retirement',
};

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
        targetPercentDisplay: percentDisplay(p.targetPercent, 1),
        metadata: i,
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
  };
};

export const runAnalysis = (data: PortfolioModel): PortfolioModelEnriched => {
  const initialAnalysis = runInitialAnalysis(data);
  const allAccounts = [
    ...initialAnalysis.shortTerm.data,
    ...initialAnalysis.longTerm.data,
    ...initialAnalysis.retirement.data,
  ];
  const allPies = allAccounts.map(a => a.pie).flat()
  return {
    ...initialAnalysis,
    allAccounts,
    allPies,
    insights: {
      globalSplit: calcGlobalSplit(
        initialAnalysis.portfolioSectorWeights.find(
          (s) => s.assetClass === 'Stocks',
        ),
        allPies.filter(p => p.assetClass === 'Stocks')
      ),
    },
  };
};
