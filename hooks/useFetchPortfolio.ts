import { useQuery, QueryResult } from 'react-query';
import { runAnalysis } from '../utils';
import { fetcher } from '../utils/fetch';
import { extractTickers } from '../utils/quotes';
import { PortfolioModelExtended } from '../ts/types';

const getPortfolio = async (): Promise<PortfolioModelExtended> => {
  const data = await fetcher('/api/portfolio');
  const tickers = extractTickers(data);
  console.log(tickers);

  return runAnalysis(data);
};

const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  return useQuery('portfolio', getPortfolio);
};

export default useFetchPortfolio;
