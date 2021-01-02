import groupBy from 'lodash.groupby';
import { PortfolioModel, TickerModel } from '../ts/types';
import { IexUrlModel, IexUrlVariants, IexFetchSimpleQuoteModel } from '../ts/iex';

export const fetcher = (url) =>
  fetch(url).then(
    (res) => res.json() as Promise<{ data: PortfolioModel; iex: IexUrlModel }>,
  );

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

// TODO
// clean up and type resp
// inject quote into account data

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
            ...stockData[key].quote,
          };
          return acc;
        }, {}),
        crypto: tickers.crypto.reduce(
          (acc, curr) => (
            (acc[curr] = data.slice(1).find((f) => f.symbol === `${curr}USD`)),
            acc
          ),
          {},
        ),
        allData: data,
      };
    });
};
