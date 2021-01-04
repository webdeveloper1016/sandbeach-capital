import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = () => {
  const { data, updatedAt } = useFetchPortfolio();
  console.log(data, updatedAt);
  return <li>TODO: IEX status here</li>;
};

export default IexStatus;
