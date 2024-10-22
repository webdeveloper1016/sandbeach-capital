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
  'Equities',
  'Fixed Income',
  'Commodities',
  'Crypto',
  'Stablecoin',
  'Cash',
  'Real Estate',
  'Cash Equivalents',
];

const cashEqClasses: AssetClassType[] = ['Stablecoin', 'Cash'];

export const categoryLabels: Record<CategoryType, string> = {
  'short-term': 'Short Term',
  'long-term': 'Long Term',
  retirement: 'Retirement',
};

const sumAccounts = (data: AirTableAccountModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.totalValue.val, 0);

const sumSlices = (data: AirTablePieModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.sliceTotalValue.val, 0);

const byTimeFrame = (
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

const byCashEqClass = (
  slices: AirTablePieModelExtended[],
  totalBalance: number,
): StatWeightModel[] => {
  const byAsset = cashEqClasses.map((assetClass) => {
    const filtered = sumSlices(
      slices.filter((a) => a.subAssetClass === assetClass),
    );
    return {
      label: assetClass,
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
    };
  });

  const withTotal = byAsset.reduce(
    (accum, current) => accum + current.value.val,
    0,
  );

  const bySubAssetClasses = [
    ...byAsset,
    {
      label: 'Total',
      value: currencyDisplay(withTotal),
      weight: percentDisplay(withTotal, totalBalance),
    }
  ]

  return _.orderBy(bySubAssetClasses, ['weight.val'], ['asc']).filter(
    (i) => i.value.val > 0,
  );
};

const byAssetClass = (
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

  return _.orderBy(byAsset, ['weight.val'], ['desc']).filter(
    (i) => i.value.val > 0,
  );
};

const byRisk = (
  slices: AirTablePieModelExtended[],
  totalBalance: number,
): StatWeightModel[] => {
  // get individual risk levels
  const riskLevels = Object.keys(_.groupBy(slices, 'risk'));
  const byRisk = riskLevels.map((risk) => {
    const filtered = sumSlices(slices.filter((a) => a.risk === Number(risk)));
    return {
      label: risk,
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
    };
  });

  return byRisk;
};

const byFactor = (
  slices: AirTablePieModelExtended[],
  totalBalance: number,
): StatWeightModel[] => {
  // get individual factors
  const factors = _.uniq(_.compact(slices.flatMap((s) => s.factors)));

  const byRisk = factors.map((factor) => {
    const filtered = sumSlices(
      slices.filter((a) => _.includes(a.factors, factor)),
    );
    return {
      label: factor,
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
    };
  });

  return byRisk;
};

export const enrichStats = (
  accountData: AirTableAccountModelExtended[],
  totalBalance: number,
): AccountStatsModel => {
  const allSlices = accountData.flatMap((a) => a.pie);
  return {
    byTimeFrame: byTimeFrame(accountData, totalBalance),
    byAssetClass: byAssetClass(allSlices, totalBalance),
    byCashEq: byCashEqClass(allSlices, totalBalance),
    byFactor: byFactor(allSlices, totalBalance),
    byRisk: byRisk(allSlices, totalBalance),
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
