import useFetchPortfolio from '../hooks/useFetchPortfolio';

const HomePage = () => {
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
        <div className="text-gray-500 text-lg">Total Portfolio Value:</div>
        <h1 className="text-gray-500 text-5xl">
          {data.totalBalance.display}
        </h1>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Summary by Category:</h3>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Summary by Sector:</h3>
      </div>
      <pre className="text-gray-500 my-8">
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  );
};

export default HomePage;
