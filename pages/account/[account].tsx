import { useRouter } from 'next/router';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import AccountWatchlistLinks from '../../components/AccountWatchlistLinks';
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
      <AccountWatchlistLinks active={account} />
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
          { Header: 'Weight', accessor: 'weight.display' },
          { Header: 'Day', accessor: 'changePercent.perc.display' },
          { Header: 'Volume', accessor: 'volume.current.display' },
          {
            Header: 'Market Cap',
            accessor: 'stats.marketCap.display',
            style: { minWidth: '135px' },
          },
          {
            Header: '52 Week Range',
            accessor: 'stats.week52Range',
            style: { minWidth: '200px' },
          },
          { Header: 'YTD', accessor: 'stats.ytdChange.display' },
          { Header: 'PE', accessor: 'stats.peRatio' },
          {
            Header: 'Sector',
            accessor: 'sector',
            style: { minWidth: '150px' },
          },
          { Header: 'Tags', accessor: 'tags', style: { minWidth: '150px' } },
        ]}
        data={data.quotes}
      />
    </div>
  );
};

export default IndividualAccountPage;
