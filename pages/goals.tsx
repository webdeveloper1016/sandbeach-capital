import useFetchPortfolio from '../hooks/useFetchPortfolio';

const SavingsPage = () => {
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
        <h3 className="text-gray-500 text-lg">Savings:</h3>
      </div>
      <pre className="text-gray-500 my-8">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default SavingsPage;

