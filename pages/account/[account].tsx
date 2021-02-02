import { useRouter } from 'next/router';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import { AccountTable } from '../../components/AccountTable';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableStockAccounts } from '../../ts';

const IndividualAccountPage = () => {
  const router = useRouter();
  const account = router.query.account as AirTableStockAccounts;

  const { data, status } = useFetchAccount(account);

  if (status === 'loading' || !data) {
    return <AccountViewSkeleton accountName={account} />;
  }

  if (status === 'error') {
    return <Error />;
  }

  console.log(data);

  return (
    <div>
      <AccountBalanceHeader
        accountName={account}
        balance={data.summary.balance.display}
        percChange={data.summary.dayChange.perc.display}
        percClass={data.summary.dayChange.class}
      />
      <AccountTable
        columns={[
          { Header: 'Symbol', accessor: 'symbol' },
          { Header: 'Shares', accessor: 'shares' },
          { Header: 'Equity', accessor: 'equity.display' },
          { Header: 'Day Change', accessor: 'changePercent.display' },
          { Header: 'Symbol', accessor: 'symbol1' },
          { Header: 'Shares', accessor: 'shares1' },
          { Header: 'Equity', accessor: 'equity1.display' },
          { Header: 'Day Change', accessor: 'changePercent1.display' },
        ]}
        data={data.quotes}
      />
    </div>
  );
};

export default IndividualAccountPage;
