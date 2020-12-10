import { useQuery, QueryResult } from 'react-query';
import { fetcher, runAnalysis } from '../utils';
import { PortfolioModelExtended } from '../ts/types';

const getPortfolio = async (): Promise<PortfolioModelExtended> => {
  const data = await fetcher('/api/portfolio');
  return runAnalysis(data);
};

const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  return useQuery('portfolio', getPortfolio);
};

export default useFetchPortfolio;
