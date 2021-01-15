import {
  AssetClassType,
  CategoryType,
  SectorWeightModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelAnalyzed,
  PortfolioAccountModelExtended,
  PortfolioAccountModel,
} from '../ts/types';
import { IexFetchSimpleQuoteModel } from '../ts/iex';
import {
  sumAccounts,
  currencyFormatter,
  percentDisplay,
  currencyDisplay,
} from './calc';
import { determineBalanceDisplay, injectLiveQuotes } from './balances';
import {
  calcGlobalSplit,
  calcActiveSplit,
  calcRiskSplit,
  sliceDetailsAnalysis,
} from './insights';
import { priceAnnotate } from './iex';
import { runSavingsAnalysis } from './savings';

export const assetClasses: AssetClassType[] = [
  'Stocks',
  'Bonds',
  'Alts',
  'Crypto',
  'Stablecoin',
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

export const flattenData = (data: PortfolioAccountModel): AccountModel[] => {
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
  return data.map((account) => {
    return {
      ...account,
      value: currencyDisplay(
        account.balance,
        account.liveBalance ? priceAnnotate : undefined,
      ),
      categoryWeight: percentDisplay(account.balance, sumCat),
      portfolioWeight: percentDisplay(account.balance, totalBalance),
      categoryLabel: categoryLabels[account.category],
      pie: account.pie.map((pie) => ({
        ...pie,
        approxVal: determineBalanceDisplay(
          account.balance,
          account.liveBalance,
          pie.balance,
          pie.liveBalance,
          pie.targetPercent,
        ),
        targetPercentDisplay: percentDisplay(pie.targetPercent, 1),
        metadata: account,
      })),
    };
  });
};

export const runInitialAnalysis = (
  data: PortfolioAccountModel,
  liveQuotes: IexFetchSimpleQuoteModel,
): PortfolioAccountModelExtended => {
  // group and sum data
  const flatData = flattenData(data);
  const withLiveQuotes = injectLiveQuotes(flatData, liveQuotes);
  const liveData = {
    s: {
      data: withLiveQuotes.filter((f) => f.category === 'short-term'),
    },
    l: {
      data: withLiveQuotes.filter((f) => f.category === 'long-term'),
    },
    r: {
      data: withLiveQuotes.filter((f) => f.category === 'retirement'),
    },
  };

  const sumST = sumAccounts(liveData.s.data);
  const sumLT = sumAccounts(liveData.l.data);
  const sumR = sumAccounts(liveData.r.data);
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
      categorySectorWeights: calcSectorWeights(liveData.s.data, sumST),
      data: dataEnricher(liveData.s.data, sumST, totalBalance),
    },
    longTerm: {
      balance: currencyDisplay(sumLT),
      categorySectorWeights: calcSectorWeights(liveData.l.data, sumLT),
      data: dataEnricher(liveData.l.data, sumLT, totalBalance),
    },
    retirement: {
      balance: currencyDisplay(sumR),
      categorySectorWeights: calcSectorWeights(liveData.r.data, sumR),
      data: dataEnricher(liveData.r.data, sumR, totalBalance),
    },
  };
};

export const runAnalysis = (
  data: PortfolioModel,
  liveQuotes: IexFetchSimpleQuoteModel,
): PortfolioModelAnalyzed => {
  // analyze account data
  const initialAnalysis = runInitialAnalysis(data.accounts, liveQuotes);
  const allAccounts = [
    ...initialAnalysis.shortTerm.data,
    ...initialAnalysis.longTerm.data,
    ...initialAnalysis.retirement.data,
  ];
  const allPies = allAccounts.map((a) => a.pie).flat();

  // return data
  return {
    // existing data
    ...data,
    // enriched goal data
    goals: {
      ...data.goals,
      savingsAnalysis: runSavingsAnalysis(allAccounts, data.goals.savings),
    },
    // enriched account data
    accounts: {
      ...initialAnalysis,
      allAccounts,
      allPies,
      insights: {
        globalSplit: calcGlobalSplit(
          initialAnalysis.portfolioSectorWeights.find(
            (s) => s.assetClass === 'Stocks',
          ),
          allPies.filter((p) => p.assetClass === 'Stocks'),
        ),
        activeSplit: calcActiveSplit(initialAnalysis.totalBalance, allAccounts),
        riskSplit: calcRiskSplit(initialAnalysis.totalBalance, allAccounts),
        sliceDetails: sliceDetailsAnalysis(
          initialAnalysis,
          allPies,
          allAccounts,
        ),
      },
    },
  };
};
