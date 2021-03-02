import axios from 'axios';
import _ from 'lodash';
import {
  CoinCapAssetRespModel,
  CoinCapAssetModel,
  IexUrlModel,
  IexUrlVariants,
  IexSimpleQuoteModel,
  IexDetailedQuoteModel,
  IexStockQuoteModel,
} from '../ts';
import { formatStockQuote } from '../utils/iex';
import { formatCoincap } from '../utils/coincap';

// https://docs.coincap.io/#89deffa0-ab03-4e0a-8d92-637a857d2c91
export const fetchCoincap = async (
  ids: string[],
): Promise<CoinCapAssetModel[]> => {
  const { data } = await axios.get<CoinCapAssetRespModel>(
    `${process.env.COINCAP_API_URL}/assets`,
    {
      params: {
        ids: ids.join(','),
      },
    },
  );

  return formatCoincap(data.data);
};

export const iexUrl = (
  iex: IexUrlModel,
  variant: IexUrlVariants,
  symbols = '',
): string => {
  switch (variant) {
    case 'batch':
      return `${iex.baseUrl}/stock/market/batch?types=quote&symbols=${symbols}&token=${iex.token}`;
    case 'batch-logo':
      return `${iex.baseUrl}/stock/market/batch?types=quote,logo&symbols=${symbols}&token=${iex.token}`;
    default:
      return '';
  }
};

const fetchIEXBatch = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexDetailedQuoteModel> => {
  const chunks = _.chunk(symbols, 50);
  console.log(
    `Fetching ${symbols.length} symbols, in ${chunks.length} chunk(s)`,
  );
  const batches = await Promise.all(
    chunks.map((c) =>
      axios.get<IexStockQuoteModel>(iexUrl(iex, 'batch', c.join(','))),
    ),
  );

  return batches.reduce((acc, current) => {
    return {
      ...current.data,
      ...acc,
    };
  }, {});
};

export const fetchStockHoldings = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexSimpleQuoteModel> => {
  const allData = await fetchIEXBatch(symbols, iex);
  return Object.keys(allData).reduce((acc, key) => {
    acc[key] = {
      ...formatStockQuote(allData[key].quote),
    };
    return acc;
  }, {});
};

export const fetchStockHoldingsDetailed = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexDetailedQuoteModel> => {
  const allData = await fetchIEXBatch(symbols, iex);
  return allData;
};
