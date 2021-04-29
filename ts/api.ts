import { AirTableAccountModelExtended, AirTableAllTables } from './airtable';
import { AccountSummaryModel } from './summary';
import { AccountStatsModel } from './stats';
import {
  IexUrlModel,
  IexDetailedQuoteModel,
  EnrichedDetailedQuoteModel,
  IexStockQuoteDetailedModelEnriched,
} from './iex';
import { CMCEnrichedCryptoModel, CoinMarketCapAssetModel } from './cmc';

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
    cryptoQuotes: CoinMarketCapAssetModel[];
  };
}

export interface APIPortfolioModelResp {
  data: APIPortfolioModel;
}

export interface APIAccountModelResp {
  data: EnrichedDetailedQuoteModel;
}

export interface APICryptoModelResp {
  data: CMCEnrichedCryptoModel;
}
