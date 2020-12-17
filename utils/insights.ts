import {
  SectorStrategyType,
  SectorWeightModel,
  ValueWeightModel,
  PieModelExtended,
} from '../ts/types';
import { percentDisplay, currencyDisplay, sumPies } from './calc';

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
