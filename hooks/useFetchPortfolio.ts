import { useQuery, QueryResult } from 'react-query';
import { runAnalysis } from '../utils';
import { fetcher, fetchQuotes } from '../utils/fetch';
import { extractTickers } from '../utils/quotes';
import { PortfolioModelExtended } from '../ts/types';

const t =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpudWxsLCJpYXQiOjE2MTAyODA3MzIsImV4cCI6MTYxMDI4NDMzMn0.O3x1HQ8zK5brnXbBpX9e2MzlbMr5pKxiPrKwUgxSHRk';

  // TODO:
  // catch token error and send to login
  // at login, check local storage for token
const getPortfolio = async (): Promise<PortfolioModelExtended> => {
  const { data, iex } = await fetcher('/api/portfolio', t);
  const tickers = extractTickers(data);
  const quotes = await fetchQuotes(tickers, iex);
  return { ...runAnalysis(data, quotes), iex, quotes };
};

const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  // TODO: save token in state here?
  return useQuery('portfolio', getPortfolio);
};

export default useFetchPortfolio;
