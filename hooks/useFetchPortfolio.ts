import React from 'react';
import { useQuery, QueryResult } from 'react-query';
import { runAnalysis } from '../utils';
import { fetcher, fetchQuotes } from '../utils/fetch';
import { extractTickers } from '../utils/quotes';
import { PortfolioModelExtended } from '../ts/types';

// TODO:
// catch token error and send to login
// at login, check local storage for token
const useGetPortfolio = async (
  key: string,
  token: string,
): Promise<PortfolioModelExtended> => {
  console.log(token);
  const { data, iex, status } = await fetcher('/api/portfolio', token);

  if (status === 401) {
    throw new Error('Unauthorized');
  }
  console.log(data)
  const tickers = extractTickers(data);
  const quotes = await fetchQuotes(tickers, iex);
  return { ...runAnalysis(data, quotes), iex, quotes };
};

const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  // TODO: save token in state here?
  const [token, setToken] = React.useState(() => localStorage.getItem('token'));
  // React.useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const jwt = localStorage.getItem('token');
  //     setToken(jwt);
  //   }
  // }, []);
  return useQuery(['portfolio', token], useGetPortfolio);
};

export default useFetchPortfolio;
