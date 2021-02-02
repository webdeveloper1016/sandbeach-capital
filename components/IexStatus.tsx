import { useRouter } from 'next/router';
import { format } from 'date-fns';
import _ from 'lodash';
import ErrorBoundary from './ErrorBoundary';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import useFetchAccount from '../hooks/useFetchAccount';
import { AirTableStockAccounts } from '../ts';

const IexStatusComp = (): React.ReactElement => {
  const router = useRouter();
  const account = router.query.account as AirTableStockAccounts;
  const { data, updatedAt, status } = useFetchPortfolio();
  const {
    data: accountData,
    status: accountStatus,
    updatedAt: accountUpdatedAt,
  } = useFetchAccount(account);

  const mergedRQ = {
    q: account ? 'account' : 'portfolio',
    rqStatus: account ? accountStatus : status,
    rqUpdatedAt: account ? accountUpdatedAt : updatedAt,
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
