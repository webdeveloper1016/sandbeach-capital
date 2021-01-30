import { AirTableAccountModelExtended } from './airtable';
import { AccountSummaryModel } from './summary';
import { AccountStatsModel } from './stats';
import { IexUrlModel } from './iex';

export interface APIAccountModel {
  summary: AccountSummaryModel;
  stats: AccountStatsModel;
  accounts: AirTableAccountModelExtended[];
  iex: IexUrlModel;
}

export interface APIAccountModelResp {
  data: APIAccountModel;
}
