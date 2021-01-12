import { format } from 'date-fns';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = (): React.ReactElement | null => {
  const { data, updatedAt, status } = useFetchPortfolio();

  if (status !== 'success') {
    return null;
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
