import { AirTableAccountModelExtended, AirTableAllTables } from './airtable';
import { AccountSummaryModel } from './summary';
import { AccountStatsModel } from './stats';
import {
  IexUrlModel,
  IexDetailedQuoteModel,
  EnrichedDetailedQuoteModel,
  IexStockQuoteDetailedModelEnriched,
} from './iex';
import { EnrichedCryptoModel, CoinCapAssetModel } from './coincap';

export interface APIPortfolioModelSimple {
  summary: AccountSummaryModel;
  stats: AccountStatsModel;
  accounts: AirTableAccountModelExtended[];
  aggregatedHoldings: IexStockQuoteDetailedModelEnriched[];
  iex: IexUrlModel;
}

export interface APIPortfolioModel {
  accountName: string | null;
  summary: AccountSummaryModel;
  stats: AccountStatsModel;
  accounts: AirTableAccountModelExtended[];
  aggregatedHoldings: IexStockQuoteDetailedModelEnriched[];
  iex: IexUrlModel;
  supportingData: {
    quotes: IexDetailedQuoteModel;
    airtable: AirTableAllTables;
    cryptoQuotes: CoinCapAssetModel[];
  };
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
