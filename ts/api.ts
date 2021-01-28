import { AirTableAccountModelExtended } from './airtable';
import { NumberDisplayModel } from './types';
import { AccountSummaryModel } from './summary';
import { AccountStatsModel } from './stats';

export interface APIAccountModel {
  summary: AccountSummaryModel;
  stats: AccountStatsModel;
  accounts: AirTableAccountModelExtended[];
}
