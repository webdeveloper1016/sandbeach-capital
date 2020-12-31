import { PortfolioModel, TickerModel } from '../ts/types';
import { IexUrlModel, IexUrlVariants } from '../ts/iex';

export const fetcher = (url) =>
  fetch(url).then(
    (res) => res.json() as Promise<{ data: PortfolioModel; iex: IexUrlModel }>,
  );

// todo: fetch crypto

// fetch url params?
// inject quote into account data

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

export const fetchQuotes = (
  tickers: TickerModel,
  iex: IexUrlModel,
): Promise<any> => {
  const batch = iexUrl(iex, 'batch', tickers.stock.join(','));
  const btc = iexUrl(iex, 'crypto', 'btcusd');
  console.log(tickers);
  console.log(batch);
  console.log(btc);
  return fetch(batch).then((res) => {
    const data = res.json();
    return data;
  });
};
