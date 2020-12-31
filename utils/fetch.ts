import groupBy from 'lodash.groupby';
import { PortfolioModel, TickerModel } from '../ts/types';
import { IexUrlModel, IexUrlVariants } from '../ts/iex';

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
      return `${iex.baseUrl}/crypto/${symbols}/price?token=${iex.token}`;
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
): Promise<any> => {
  const batch = iexUrl(iex, 'batch', tickers.stock.join(','));
  const cryptoBatch = tickers.crypto.map((c) =>
    iexUrl(iex, 'crypto', `${c}USD`),
  );

  const requests = [batch, ...cryptoBatch].map((url) => fetch(url));
  return Promise.all(requests)
    .then((resp) => Promise.all(resp.map((r) => r.json())))
    .then((data) => ({
      stock: Object.keys(data[0]).reduce((acc, key) => {
        acc[key] = {
          ...data[0][key].quote,
          price: data[0][key].quote.latestPrice,
          symbol: data[0][key].quote.symbol,
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
    }));
};
