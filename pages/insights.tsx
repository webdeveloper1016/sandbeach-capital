import useFetchPortfolio from '../hooks/useFetchPortfolio';

const InsightsPage = () => {
  const { data, status } = useFetchPortfolio();

  if (status === 'loading') {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
  }

  console.log(data);

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Domestic/Foreign:</h3>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Active/Passive:</h3>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">1-5 Risk breakdown:</h3>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">sector/subsector breakdowns:</h3>
      </div>
      <pre className="text-gray-500 my-8">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default InsightsPage;
