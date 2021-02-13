import axios from 'axios';
import {
  CoinCapAssetRespModel,
  CoinCapAssetModel,
  IexUrlModel,
  IexUrlVariants,
  IexSimpleQuoteModel,
  IexDetailedQuoteModel,
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

export const fetchStockHoldings = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexSimpleQuoteModel> => {
  console.log(`Fetching ${symbols.length} symbols`);
  const batch = iexUrl(iex, 'batch', symbols.join(','));
  const { data } = await axios.get(batch);
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = {
      ...formatStockQuote(data[key].quote),
    };
    return acc;
  }, {});
};

export const fetchStockHoldingsDetailed = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexDetailedQuoteModel> => {
  console.log(`Fetching ${symbols.length} symbols`);
  const batch = iexUrl(iex, 'batch', symbols.join(','));
  const { data } = await axios.get<IexDetailedQuoteModel>(batch);
  return data;
};
