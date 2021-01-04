import get from 'lodash.get';
import {
  AssetClassType,
  CategoryType,
  SectorWeightModel,
  MarketDataModel,
  NumberDisplayModel,
  PieModel,
  AccountModel,
  AccountModelExtended,
  PortfolioModel,
  PortfolioModelExtended,
  PortfolioAccountModelExtended,
  PortfolioAccountModel,
} from '../ts/types';
import { IexFetchSimpleQuoteModel, IexQuoteModelEnriched } from '../ts/iex';
import {
  sumAccounts,
  currencyFormatter,
  percentDisplay,
  currencyDisplay,
} from './calc';
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

export const injectLiveQuotes = (
  data: AccountModel[],
  liveQuotes: IexFetchSimpleQuoteModel,
): AccountModel[] => {
  return data.map((a) => {
    // for each account, map over each pie slice...
    const pieWithLiveData: PieModel[] = a.pie
      .map((p) => {
        // if no market data, return null, we .filter it below and fall back to manual balance
        if (!p.marketData) return null;
        // map over market data
        // cross ref with IEX data
        const enrichedMarketData = p.marketData.map((m) => {
          const match: IexQuoteModelEnriched | undefined = get(
            liveQuotes,
            [m.market, m.ticker],
            undefined,
          );
          if (!match) return m;

          return {
            ...m,
            liveQuote: match,
            balance: m.shares * match.price.val,
            liveBalance: true,
          };
        });
        return {
          ...p,
          balance: enrichedMarketData.reduce(
            (accum, current) => accum + current.balance || 0,
            0,
          ),
          liveBalance: true,
          marketData: enrichedMarketData,
        };
      })
      .filter((x) => x);

    // if we have cross referenced live data, use that
    // if not, return existing manual balance
    const haveLiveBalance = pieWithLiveData.length > 0;
    return {
      ...a,
      balance: haveLiveBalance
        ? pieWithLiveData.reduce(
            (accum, current) => accum + current.balance || 0,
            0,
          )
        : a.balance,
      liveBalance: haveLiveBalance,
      pie: haveLiveBalance ? pieWithLiveData : a.pie,
    };
  });
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

export const determineBalanceDisplay = (
  account: number,
  accountLive: boolean,
  pie: number,
  pieLive: boolean,
  target: number,
  other: any,
): NumberDisplayModel => {
  let balance = 0;
  let annotate = '';

  switch (true) {
    // we have live data at the slice level
    case Boolean(pieLive):
      balance = pie;
      annotate = priceAnnotate;
      break;
    // we have manual data at the slice level
    case Boolean(pie):
      balance = pie;
      annotate = ' 🥧';
      break;
    // we have live data at the account level, but need to calc percent for pie
    case Boolean(accountLive):
      balance = account * target;
      annotate = priceAnnotate;
      break;
    // no live data, approx value based on target weight
    default:
      balance = account * target;
      break;
  }

  return currencyDisplay(balance, annotate);
};

export const dataEnricher = (
  data: AccountModel[],
  sumCat: number,
  totalBalance: number,
): AccountModelExtended[] => {
  return data.map((i) => {
    return {
      ...i,
      value: currencyDisplay(
        i.balance,
        i.liveBalance ? priceAnnotate : undefined,
      ),
      categoryWeight: percentDisplay(i.balance, sumCat),
      portfolioWeight: percentDisplay(i.balance, totalBalance),
      categoryLabel: categoryLabels[i.category],
      pie: i.pie.map((p) => ({
        ...p,
        approxVal: determineBalanceDisplay(
          i.balance,
          i.liveBalance,
          p.balance,
          p.liveBalance,
          p.targetPercent,
          { i, p },
        ),
        targetPercentDisplay: percentDisplay(p.targetPercent, 1),
        metadata: i,
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
): PortfolioModelExtended => {
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
