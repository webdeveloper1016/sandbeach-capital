import axios from 'axios';
import { formatCryptoQuote, formatStockQuote } from './iex';
import { PortfolioModel, TickerModel } from '../ts/types';
import {
  IexUrlModel,
  IexUrlVariants,
  IexFetchSimpleQuoteModel,
} from '../ts/iex';

// export const fetcher = (url: string, token: string) =>
//   fetch(url, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   }).then((res) => {
//     const t = res.json();
//     console.log(t);
//     return { ...t, status: res.status } as Promise<{
//       data: PortfolioModel;
//       iex: IexUrlModel;
//       status: number;
//     }>;
//   });

export const fetcher = async (
  url: string,
  token: string,
): Promise<{ data: PortfolioModel; iex: IexUrlModel; status: number }> => {
  const data = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { ...data.data, status: data.status };
};

export const iexUrl = (
  iex: IexUrlModel,
  variant: IexUrlVariants,
  symbols = '',
): string => {
  switch (variant) {
    case 'batch':
      return `${iex.baseUrl}/stock/market/batch?types=quote&symbols=${symbols}&token=${iex.token}`;
    case 'crypto':
      return `${iex.baseUrl}/crypto/${symbols}/quote?token=${iex.token}`;
    default:
      return '';
  }
};

export const fetchQuotes = (
  tickers: TickerModel,
  iex: IexUrlModel,
): Promise<IexFetchSimpleQuoteModel> => {
  const batch = iexUrl(iex, 'batch', tickers.stock.join(','));
  const cryptoBatch = tickers.crypto.map((c) =>
    iexUrl(iex, 'crypto', `${c}USD`),
  );

  const requests = [batch, ...cryptoBatch].map((url) => fetch(url));
  return Promise.all(requests)
    .then((resp) => Promise.all(resp.map((r) => r.json())))
    .then((data) => {
      const stockData = data[0];
      return {
        stock: Object.keys(stockData).reduce((acc, key) => {
          acc[key] = {
            ...formatStockQuote(stockData[key].quote),
          };
          return acc;
        }, {}),
        crypto: tickers.crypto.reduce(
          (acc, curr) => (
            (acc[curr] = formatCryptoQuote(
              data.slice(1).find((f) => f.symbol === `${curr}USD`),
            )),
            acc
          ),
          {},
        ),
        allData: data,
      };
    });
};
