import { AirTableAccountModelExtended } from './airtable';
import { AccountSummaryModel } from './summary';
import { AccountStatsModel } from './stats';
import { IexUrlModel, EnrichedDetailedQuoteModel } from './iex';
import { EnrichedCryptoModel } from './coincap';

export interface APIPortfolioModel {
  summary: AccountSummaryModel;
  stats: AccountStatsModel;
  accounts: AirTableAccountModelExtended[];
  iex: IexUrlModel;
}

export interface APIPortfolioModelResp {
  data: APIPortfolioModel;
}

export interface APIAccountModelResp {
  data: EnrichedDetailedQuoteModel;
}

export interface APICryptoModelResp {
  data: EnrichedCryptoModel;
}
