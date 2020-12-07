import { useQuery } from 'react-query';
import { fetcher, runAnalysis } from '../utils';
import { PortfolioModel } from '../types';

const getPortfolio = (): Promise<PortfolioModel> => {
  return fetcher('/api/portfolio');
};

const HomePage = () => {
  const { data: apiData, status } = useQuery('portfolio', getPortfolio);

  if (status === 'loading') {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
  }

  const data = runAnalysis(apiData);
  console.log(data);

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Savings:</h3>
      </div>
      <pre className="text-gray-500 my-8">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default HomePage;

