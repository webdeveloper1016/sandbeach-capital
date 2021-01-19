import { format } from 'date-fns';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatus = (): React.ReactElement => {
  const { data, updatedAt, status } = useFetchPortfolio();

  if (status !== 'success') {
    return <div />;
  }

  return (
    <div>
      <a href="https://iexcloud.io" className="mx-2 text-green-300 underline">
        IEX Cloud {data.iex.env}
      </a>
      <span>{format(updatedAt, 'p')}</span>
    </div>
  );
};

export default IexStatus;
