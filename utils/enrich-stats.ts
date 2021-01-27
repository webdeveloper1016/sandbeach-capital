import { percentDisplay, currencyDisplay } from './calc';
import {
  CategoryType,
  AssetClassType,
  AirTableAccountModelExtended,
} from '../ts';

export const assetClasses: AssetClassType[] = [
  'Stocks',
  'Bonds',
  'Alts',
  'Crypto',
  'Stablecoin',
  'Cash',
  'Real Estate',
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

export const sumAccounts = (data: AirTableAccountModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.totalValue, 0);

export const byTimeFrame = (
  accountData: AirTableAccountModelExtended[],
  totalBalance: number,
) => {
  return Object.keys(categoryLabels).map((cat) => {
    const filtered = sumAccounts(
      accountData.filter((a) => a.timeframe === cat),
    );
    return {
      value: currencyDisplay(filtered),
      weight: percentDisplay(filtered, totalBalance),
      label: categoryLabels[cat],
    };
  });
};

export const enrichStats = (
  accountData: AirTableAccountModelExtended[],
  totalBalance: number,
) => {
  const allPies = accountData.flatMap(a => a.pie)
  return {
    byTimeFrame: byTimeFrame(accountData, totalBalance),
    byAssetClass: allPies,
    byFactor: [],
    byRisk: [],
  };
};
