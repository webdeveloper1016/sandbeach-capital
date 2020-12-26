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

  const speculative = withDetails.reduce(
    (accum, current) =>
      accum + current.approxVal.val * (current.sliceDetails.speculative || 0),
    0,
  );

  return [
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Active',
    },
    {
      value: currencyDisplay(speculative),
      weight: percentDisplay(speculative, totalBalance),
      assetClassWeight: percentDisplay(speculative, stockSectorBalance),
      assetClass: 'Stocks',
      label: 'Speculative',
    },
    {
      ...initialAnalysis.portfolioSectorWeights.find(
        (p) => p.assetClass === 'Crypto',
      ),
      label: 'Crypto',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Growth',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Income',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Tech',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Momentum',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Quality',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'ESG',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Small Cap',
    },
    {
      value: currencyDisplay(0),
      weight: percentDisplay(1, 2),
      label: 'Intl',
    },
    {
      ...initialAnalysis.portfolioSectorWeights.find(
        (p) => p.assetClass === 'Alts',
      ),
      label: 'Alts',
    },
    {
      ...initialAnalysis.portfolioSectorWeights.find(
        (p) => p.assetClass === 'Bonds',
      ),
      label: 'Bonds',
    },
    {
      ...initialAnalysis.portfolioSectorWeights.find(
        (p) => p.assetClass === 'Cash',
      ),
      label: 'Cash',
    },
  ];
};
