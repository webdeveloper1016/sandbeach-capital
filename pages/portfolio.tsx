import { useQuery } from 'react-query';
import { fetcher } from '../utils';
import { PortfolioModel } from '../types';

const getPortfolio = ():Promise<PortfolioModel[]> => {
  return fetcher('/api/portfolio');
};

const PortfolioPage = () => {
  const { data, status } = useQuery('portfolio', getPortfolio);
  console.log(data);

  if (status === 'loading') {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
  }

  return <div className="text-gray-500">Portfolio</div>;
};

export default PortfolioPage;
