import {
  SectorWeightModel,
  ValueWeightModel,
  PieModelExtended,
} from '../ts/types';
import {
  percentDisplay,
  currencyDisplay,
} from './calc';

interface GlobalSplitModel {
  us: ValueWeightModel;
  foreign: ValueWeightModel;
}

export const calcGlobalSplit = (
  sumStocks: SectorWeightModel,
  data: PieModelExtended[],
): GlobalSplitModel => {
  console.log(sumStocks, data);

  return {
    us: {
      value: currencyDisplay(5),
      weight: percentDisplay(5, 10),
      label: 'U.S.',
    },
    foreign: {
      value: currencyDisplay(5),
      weight: percentDisplay(5, 10),
      label: 'Foreign',
    },
  };
};
