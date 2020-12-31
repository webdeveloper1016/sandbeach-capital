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
// format crypto requests via ticker array
// format/standardize resp
// inject quote into account data

export const fetchQuotes = (
  tickers: TickerModel,
  iex: IexUrlModel,
): Promise<any> => {
  const batch = iexUrl(iex, 'batch', tickers.stock.join(','));
  const btc = iexUrl(iex, 'crypto', 'btcusd');
  console.log(tickers);

  const requests = [batch, btc].map((url) => fetch(url));
  return Promise.all(requests)
    .then((resp) => Promise.all(resp.map((r) => r.json())))
    .then((data) => ({
      stock: data[0],
      crypto: data[1],
    }));
};
