import _ from 'lodash';
import { percentDisplay, currencyDisplay } from './calc';
import {
  CategoryType,
  AssetClassType,
  AirTablePieModelExtended,
  AirTableAccountModelExtended,
  StatWeightModel,
  AccountStatsModel,
} from '../ts';

const assetClasses: AssetClassType[] = [
  'Stocks',
  'Bonds',
  'Alts',
  'Crypto',
  'Stablecoin',
  'Cash',
  'Real Estate',
];

export const categoryLabels: Record<CategoryType, string> = {
  'short-term': 'Short Term',
  'long-term': 'Long Term',
  retirement: 'Retirement',
};

const sumAccounts = (data: AirTableAccountModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.totalValue.val, 0);

const sumSlices = (data: AirTablePieModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.sliceTotalValue.val, 0);

export const byTimeFrame = (
  accountData: AirTableAccountModelExtended[],
  totalBalance: number,
): StatWeightModel[] => {
  return Object.keys(categoryLabels).map((cat) => {
    const filtered = sumAccounts(
      accountData.filter((a) => a.timeframe === categoryLabels[cat]),
    );
    return {
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
      label: categoryLabels[cat],
    };
  });
};

export const byAssetClass = (
  slices: AirTablePieModelExtended[],
  totalBalance: number,
): StatWeightModel[] => {
  const byAsset = assetClasses.map((assetClass) => {
    const filtered = sumSlices(
      slices.filter((a) => a.assetClass === assetClass),
    );
    return {
      label: assetClass,
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
    };
  });

  return _.orderBy(byAsset, ['weight.val'], ['desc']);
};

export const enrichStats = (
  accountData: AirTableAccountModelExtended[],
  totalBalance: number,
): AccountStatsModel => {
  const allSlices = accountData.flatMap((a) => a.pie);
  return {
    byTimeFrame: byTimeFrame(accountData, totalBalance),
    byAssetClass: byAssetClass(allSlices, totalBalance),
    byFactor: [],
    byRisk: [],
    byContribution: [
      {
        label: 'YOY Recurring',
        value: currencyDisplay(
          accountData.reduce(
            (accum, current) => accum + current.annualContribution,
            0,
          ),
        ),
      },
    ],
  };
};
