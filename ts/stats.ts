import { NumberDisplayModel } from './types';

export interface StatWeightModel {
  label: string;
  value: NumberDisplayModel;
  weight: NumberDisplayModel;
}

export interface AccountStatsModel {
  byTimeFrame: StatWeightModel[];
  byAssetClass: StatWeightModel[];
  byCashEq: StatWeightModel[];
  byFactor: StatWeightModel[];
  byRisk: StatWeightModel[];
  byContribution: {
    label: string;
    value: NumberDisplayModel;
  }[];
}
