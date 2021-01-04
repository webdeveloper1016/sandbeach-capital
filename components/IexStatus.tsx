import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = (): React.ReactElement => {
  const { data, updatedAt, status} = useFetchPortfolio();
  console.log(data, updatedAt);
  if (status !== 'success') {
    return <li className=" animate-pulse h-4 bg-green-500 rounded w-1/4"></li>
  }
  return <li>{data.iex.env} Updated 1 Min ago</li>;
};

export default IexStatus;
