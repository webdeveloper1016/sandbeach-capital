import { PortfolioModel, TickerModel } from '../ts/types';

export const fetcher = (url) =>
  fetch(url).then(
    (res) => res.json() as Promise<{ data: PortfolioModel; token: string }>,
  );

export const fetchQuotes = (
  tickers: TickerModel,
  token: string,
): Promise<any> => {
  const symbols = tickers.stock.join(',');
  const batch = `https://sandbox.iexapis.com/v1/stock/market/batch?types=quote&symbols=${symbols}&token=${token}`;
  // const iex = `https://sandbox.iexapis.com/stable/stock/IBM/quote?token=${token}`;
  console.log(tickers);
  console.log(batch);
  return fetch(batch).then((res) => {
    const data = res.json();
    return data;
  });
};
