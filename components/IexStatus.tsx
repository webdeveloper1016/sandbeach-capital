import { useRouter } from 'next/router';
import { format } from 'date-fns';
import _ from 'lodash';
import ErrorBoundary from './ErrorBoundary';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import useFetchAccount from '../hooks/useFetchAccount';
import { AirTableAccountRoutes } from '../ts';

// TODO: this time update is not always working

const IexStatusComp = (): React.ReactElement => {
  const router = useRouter();
  const account = router.query.account as AirTableAccountRoutes;
  const { data, dataUpdatedAt, status } = useFetchPortfolio();
  const {
    data: accountData,
    status: accountStatus,
    dataUpdatedAt: accountUpdatedAt,
  } = useFetchAccount(account);

  const mergedRQ = {
    q: account ? 'account' : 'portfolio',
    rqStatus: account ? accountStatus : status,
    rqUpdatedAt: account ? accountUpdatedAt : dataUpdatedAt,
  };

  if (mergedRQ.rqStatus !== 'success') {
    return <div />;
  }

  return (
    <div>
      <a href="https://iexcloud.io" className="mx-2 text-green-300 underline">
        IEX Cloud {_.get(data, 'iex.env', '')}
      </a>
      <span>{format(mergedRQ.rqUpdatedAt, 'p')}</span>
    </div>
  );
};

const IexStatus = () => (
  <ErrorBoundary fallback={<div />}>
    <IexStatusComp />
  </ErrorBoundary>
);

export default IexStatus;
