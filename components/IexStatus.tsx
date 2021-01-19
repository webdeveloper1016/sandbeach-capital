import { format } from 'date-fns';
import ErrorBoundary from './ErrorBoundary';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const IexStatusComp = (): React.ReactElement => {
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

const IexStatus = () => (
  <ErrorBoundary fallback={<div/>}>
    <IexStatusComp />
  </ErrorBoundary>
);

export default IexStatus;
