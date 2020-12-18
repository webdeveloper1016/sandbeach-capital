import {
  NumberDisplayModel,
  SectorStrategyType,
  SectorWeightModel,
  ValueWeightModel,
  AccountModelExtended,
  PieModelExtended,
} from '../ts/types';
import { percentDisplay, currencyDisplay, sumAccounts, sumPies } from './calc';

export const calcGlobalSplit = (
  stocksSum: SectorWeightModel,
  stockData: PieModelExtended[],
): ValueWeightModel[] => {
  const foreignSectors: SectorStrategyType[] = [
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
      label: 'Foreign',
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
  console.log(totalBalance);
  console.log(allAccounts);
  return [
    {
      value: currencyDisplay(5),
      weight: percentDisplay(5, 10),
      label: '1',
    },
  ];
};