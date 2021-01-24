import axios from 'axios';
import {
  CoinCapAssetRespModel,
  CoinCapAssetModel,
  IexUrlModel,
  IexUrlVariants,
  IexSimpleQuoteModel,
} from '../ts';
import { formatStockQuote } from '../utils/iex';

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

  return data.data.map((i) => ({
    ...i,
    priceUsdNumber: Number(i.priceUsd),
  }));
};

export const iexUrl = (
  iex: IexUrlModel,
  variant: IexUrlVariants,
  symbols = '',
): string => {
  switch (variant) {
    case 'batch':
      return `${iex.baseUrl}/stock/market/batch?types=quote&symbols=${symbols}&token=${iex.token}`;
    default:
      return '';
  }
};

export const fetchStockHoldings = async (
  symbols: string[],
  iex: IexUrlModel,
): Promise<IexSimpleQuoteModel> => {
  console.log(symbols)
  const batch = iexUrl(iex, 'batch', symbols.join(','));
  const { data } = await axios.get(batch);
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = {
      ...formatStockQuote(data[key].quote),
    };
    return acc;
  }, {});
};
