import groupBy from 'lodash.groupby';
import {
  NumberDisplayModel,
  SectorStrategyType,
  SectorWeightModel,
  ValueWeightModel,
  AccountModelExtended,
  PieModelExtended,
  PortfolioAccountModelExtended,
  SliceDetailsAnalysisModel,
  FactorTypes,
  AssetClassType,
} from '../ts/types';
import { percentDisplay, currencyDisplay, sumAccounts, sumPies } from './calc';

export const calcGlobalSplit = (
  stocksSum: SectorWeightModel,
  stockData: PieModelExtended[],
): ValueWeightModel[] => {
  const foreignSectors: SectorStrategyType[] = [
    'Intl',
    'Foreign Stocks',
    'EMG Market Stocks',
    'Global Stock Mix',
  ];
  const foreignSum = sumPies(
    stockData.filter((d) => foreignSectors.includes(d.sector)),
  );
  const usSum = sumPies(
    stockData.filter((d) => !foreignSectors.includes(d.sector)),
  );

  return [
    {
      value: currencyDisplay(usSum),
      weight: percentDisplay(usSum, stocksSum.value.val),
      label: 'U.S.',
    },
    {
      value: currencyDisplay(foreignSum),
      weight: percentDisplay(foreignSum, stocksSum.value.val),
      label: 'Intl',
    },
    {
      value: stocksSum.value,
      weight: percentDisplay(stocksSum.value.val, stocksSum.value.val), // this is 100% of all stocks
      label: 'All',
    },
  ];
};

export const calcActiveSplit = (
  totalBalance: NumberDisplayModel,
  allAccounts: AccountModelExtended[],
): ValueWeightModel[] => {
  const activeSum = sumAccounts(allAccounts.filter((a) => a.active));
  const passiveSum = totalBalance.val - activeSum;

  return [
    {
      value: currencyDisplay(activeSum),
      weight: percentDisplay(activeSum, totalBalance.val),
      label: 'Active',
    },
    {
      value: currencyDisplay(passiveSum),
      weight: percentDisplay(passiveSum, totalBalance.val),
      label: 'Passive',
    },
  ];
};

export const calcRiskSplit = (
  totalBalance: NumberDisplayModel,
  allAccounts: AccountModelExtended[],
): ValueWeightModel[] => {
  // group by risk
  const grouped = groupBy(allAccounts, 'risk') as Record<
    string,
    AccountModelExtended[]
  >;

  // sum each risk level
  const formatted = Object.keys(grouped).map((r) => {
    const accountSum = sumAccounts(grouped[r]);
    return {
      value: currencyDisplay(accountSum),
      weight: percentDisplay(accountSum, totalBalance.val),
      label: r,
    };
  });

  return formatted;
};

const calcFactor = (
  withDetails: PieModelExtended[],
  factor: FactorTypes,
  options: {
    totalBalance: number;
    assetClassBalance: number;
    label: string;
    assetClass: AssetClassType;
  },
): SliceDetailsAnalysisModel => {
  const sum = withDetails.reduce(
    (accum, current) =>
      accum + current.approxVal.val * (current.sliceDetails[factor] || 0),
    0,
  );
  return {
    value: currencyDisplay(sum),
    weight: percentDisplay(sum, options.totalBalance),
    assetClassWeight: percentDisplay(sum, options.assetClassBalance),
    assetClass: options.assetClass,
    label: options.label,
  };
};

export const sliceDetailsAnalysis = (
  initialAnalysis: PortfolioAccountModelExtended,
  pieData: PieModelExtended[],
  allAccounts: AccountModelExtended[],
): SliceDetailsAnalysisModel[] => {
  const withDetails = pieData.filter((p) => p.sliceDetails);
  const totalBalance = initialAnalysis.totalBalance.val;
  const stockSectorBalance = initialAnalysis.portfolioSectorWeights.find(
    (p) => p.assetClass === 'Stocks',
  ).value.val;

  return [
    {
      ...calcFactor(withDetails, 'active', {
        assetClass: 'Stocks',
        label: 'Active',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'speculative', {
        assetClass: 'Stocks',
        label: 'Speculative',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'income', {
        assetClass: 'Stocks',
        label: 'Income',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'tech', {
        assetClass: 'Stocks',
        label: 'Tech',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'momentum', {
        assetClass: 'Stocks',
        label: 'Momentum',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'quality', {
        assetClass: 'Stocks',
        label: 'Quality',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'esg', {
        assetClass: 'Stocks',
        label: 'ESG',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'smallcap', {
        assetClass: 'Stocks',
        label: 'Small Cap',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'intl', {
        assetClass: 'Stocks',
        label: 'Intl',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
    {
      ...calcFactor(withDetails, 'value', {
        assetClass: 'Stocks',
        label: 'Value',
        totalBalance,
        assetClassBalance: stockSectorBalance,
      }),
    },
  ];
};
