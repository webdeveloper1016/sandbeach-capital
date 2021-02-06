import { useRouter } from 'next/router';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import AccountWatchlistLinks from '../../components/AccountWatchlistLinks';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import Pill from '../../components/Pill';
import { AccountTable } from '../../components/AccountTable';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableAccountRoutes, PercChangeModel } from '../../ts';

const IndividualAccountPage = () => {
  const router = useRouter();
  const account = router.query.account as AirTableAccountRoutes;

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
          { Header: 'Price', accessor: 'prices.latest.display' },
          { Header: 'Shares', accessor: 'shares' },
          { Header: 'Equity', accessor: 'equity.display' },
          { Header: 'Weight', accessor: 'weight.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => {
              return (
                <div className={instance.value.class}>
                  {instance.value.perc.display}
                </div>
              );
            },
          },
          { Header: 'Volume', accessor: 'volume.current.display' },
          {
            Header: 'Market Cap',
            accessor: 'stats.marketCap.display',
            style: { minWidth: '135px' },
          },
          {
            Header: '52 Week Range',
            accessor: 'stats.week52Range',
            style: { minWidth: '170px' },
          },
          { Header: 'YTD', accessor: 'stats.ytdChange.display' },
          {
            Header: 'Sector',
            accessor: 'sector',
            style: { minWidth: '170px' },
            Cell: (instance: { value: string }) => (
              <div className="flex ">
                <Pill color="blue" content={instance.value} />
              </div>
            ),
          },
          {
            Header: 'Tags',
            accessor: 'tags',
            style: { minWidth: '225px' },
            Cell: (instance: { value: string[] }) => (
              <div className="flex">
                {instance.value.map((v) => (
                  <span className="mr-1 last:mr-0" key={v}>
                    <Pill color="yellow" content={v} />
                  </span>
                ))}
              </div>
            ),
          },
        ]}
        data={data.quotes}
      />
    </div>
  );
};

export default IndividualAccountPage;
