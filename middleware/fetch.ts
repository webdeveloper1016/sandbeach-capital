import axios from 'axios';
import _ from 'lodash';
import {
  IexUrlModel,
  IexUrlVariants,
  IexDetailedQuoteModel,
  IexStockQuoteModel,
  AirTablePieModel,
  AirTableAllTables,
  CoinMarketCapAssetModel,
  CoinMarketCapRespModel,
} from '../ts';
import { extractConfig } from '../utils/extract-config';
import { formatCoinMarketCap } from '../utils/cmc';
import { enrichAccounts } from '../utils/enrich-accounts';
import { enrichCrypto } from '../utils/enrich-crypto';

export const fetchCoinMarketCap = async (
  ids: string[],
): Promise<CoinMarketCapAssetModel[]> => {
  const { data } = await axios.get<CoinMarketCapRespModel>(
    `${process.env.CMC_API_URL}`,
    {
      params: {
        slug: ids.join(','),
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
      },
    },
  );

  return formatCoinMarketCap(data);
};

export const iexUrl = (
  iex: IexUrlModel,
  variant: IexUrlVariants,
  symbols = '',
): string => {
  switch (variant) {
    case 'batch':
      return `${iex.baseUrl}/stock/market/batch?types=quote&symbols=${symbols}&token=${iex.token}`;
    case 'batch-stats':
      return `${iex.baseUrl}/stock/market/batch?types=quote,stats&symbols=${symbols}&token=${iex.token}`;
    case 'batch-logo':
      return `${iex.baseUrl}/stock/market/batch?types=quote,logo&symbols=${symbols}&token=${iex.token}`;
    default:
      return '';
  }
};

export const fetchIEXBatch = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexDetailedQuoteModel> => {
  const chunks = _.chunk(symbols, 50);
  console.log(
    `Fetching ${symbols.length} symbols, in ${chunks.length} chunk(s)`,
  );
  const batches = await Promise.all(
    chunks.map((c) =>
      axios.get<IexStockQuoteModel>(iexUrl(iex, 'batch-stats', c.join(','))),
    ),
  );

  return batches.reduce((acc, current) => {
    return {
      ...current.data,
      ...acc,
    };
  }, {});
};

export const fetchStockHoldingsDetailed = async (
  pies: AirTablePieModel[],
  iex: IexUrlModel,
): Promise<IexDetailedQuoteModel> => {
  const symbols = _.uniqBy(pies, 'symbol')
    .map((x) => x.symbol)
    .filter((x) => x);
  const allData = await fetchIEXBatch(symbols, iex);
  return allData;
};

export const fetchPortfolio = async (
  airtable: AirTableAllTables,
  iex: IexUrlModel,
) => {
  const { accounts, crypto, pies, config, transactions } = airtable;
  const quotes = await fetchStockHoldingsDetailed(pies, iex);
  const airtableConfig = extractConfig(config);

  const cryptoQuotes = await fetchCoinMarketCap(
    _.uniqBy(crypto, 'coin').map((x) => x.coin),
  );

  const allAccountData = enrichAccounts(
    accounts,
    pies,
    quotes,
    enrichCrypto(crypto, cryptoQuotes, transactions, airtableConfig),
    iex,
  );

  return {
    airtable,
    quotes,
    cryptoQuotes,
    allAccountData,
    airtableConfig,
  };
};
