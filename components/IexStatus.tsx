import { format } from 'date-fns';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = (): React.ReactElement => {
  const { data, updatedAt, status } = useFetchPortfolio();

  if (status !== 'success') {
    return <li className=" animate-pulse h-4 bg-green-500 rounded w-1/4"></li>;
  }
  return (
    <li>
      <a href="https://iexcloud.io" className="mx-2 text-green-300 underline">
        IEX Cloud {data.iex.env}
      </a>
      <span>{format(updatedAt, 'p')}</span>
    </li>
  );
};

export default IexStatus;
