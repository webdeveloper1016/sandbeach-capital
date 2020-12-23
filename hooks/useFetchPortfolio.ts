import { useQuery, QueryResult } from 'react-query';
import { runAnalysis } from '../utils';
import { fetcher, fetchQuotes } from '../utils/fetch';
import { extractTickers } from '../utils/quotes';
import { PortfolioModelExtended } from '../ts/types';

const getPortfolio = async (): Promise<PortfolioModelExtended> => {
  const { data, token } = await fetcher('/api/portfolio');
  const tickers = extractTickers(data);
  const quotes = await fetchQuotes(tickers, token);
  console.log(quotes);

  return runAnalysis(data);
};

const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  return useQuery('portfolio', getPortfolio);
};

export default useFetchPortfolio;
