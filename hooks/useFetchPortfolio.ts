import { useQuery, QueryResult } from 'react-query';
import { fetcher, runAnalysis } from '../utils';
import { PortfolioModelEnriched } from '../ts/types';

const getPortfolio = async (): Promise<PortfolioModelEnriched> => {
  const data = await fetcher('/api/portfolio');
  return runAnalysis(data);
};

const useFetchPortfolio = (): QueryResult<PortfolioModelEnriched> => {
  return useQuery('portfolio', getPortfolio);
};

export default useFetchPortfolio;
