import { PortfolioModel, TickerModel } from '../ts/types';

export const fetcher = (url) =>
  fetch(url).then(
    (res) => res.json() as Promise<{ data: PortfolioModel; token: string }>,
  );

//https://intercom.help/iexcloud/en/articles/2852094-how-do-i-query-multiple-symbols-or-data-types-in-one-api-call
export const fetchQuotes = (
  tickers: TickerModel,
  token: string,
): Promise<any> => {
  const iex = `https://sandbox.iexapis.com/stable/stock/IBM/quote?token=${token}`;
  console.log(tickers);
  return fetch(iex).then((res) => {
    const data = res.json();
    return data;
  });
};
