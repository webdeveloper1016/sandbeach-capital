import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = (): React.ReactElement => {
  const { data, updatedAt, status} = useFetchPortfolio();
  console.log(data, updatedAt);
  if (status !== 'success') {
    return <li>skeleton</li>
  }
  return <li>{data.iex.env} Updated 1 Min ago</li>;
};

export default IexStatus;
