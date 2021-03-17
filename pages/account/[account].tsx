import { useRouter } from 'next/router';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import AccountWatchlistLinks from '../../components/AccountWatchlistLinks';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import {
  SymbolNameCell,
  TagCell,
  TagListCell,
  PercChangeCell,
} from '../../components/TableCells';
import { AccountTable } from '../../components/AccountTable';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableAccountRoutes, PercChangeModel } from '../../ts';

// TODO: add trading view chart popover
// https://www.tradingview.com/widget/mini-chart/
const IndividualAccountPage = () => {
  const router = useRouter();
  const account = router.query.account as AirTableAccountRoutes;

  const { data, status } = useFetchAccount(account);

  if (status === 'error') {
    return (
      <div>
        <AccountWatchlistLinks active={account} />
        <Error />
      </div>
    );
  }

  if (status === 'loading' || !data) {
    return <AccountViewSkeleton accountName={account} />;
  }

  return (
    <div>
      <AccountWatchlistLinks active={account} />
      <AccountBalanceHeader
        accountName={account}
        balance={data.summary.balance.display}
        percChange={data.summary.dayChange.perc.display}
        percClass={data.summary.dayChange.class}
        weight={data.summary.weight}
      />
      <AccountTable
        columns={[
          {
            Header: 'Symbol',
            accessor: 'symbolCompany',
            Cell: (instance: { value: { symbol: string; name: string } }) => (
              <SymbolNameCell value={instance.value} />
            ),
          },
          { Header: 'Price', accessor: 'prices.latest.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          { Header: 'Equity', accessor: 'equity.display' },
          { Header: 'Weight', accessor: 'weight.display' },
          { Header: 'Shares', accessor: 'shares' },
          { Header: 'Volume', accessor: 'volume.current.display' },
          {
            Header: 'Mkt Cap',
            accessor: 'stats.marketCap.display',
          },
          {
            Header: 'YTD',
            accessor: 'stats.ytdChange',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          {
            Header: '52W Range',
            accessor: 'stats.week52Range',
            style: { minWidth: '170px' },
          },
          {
            Header: 'Off High',
            accessor: 'stats.week52OffHighPercent',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          {
            Header: 'Sector',
            accessor: 'sector',
            style: { minWidth: '170px' },
            Cell: (instance: { value: string }) => (
              <TagCell value={instance.value} />
            ),
          },
          {
            Header: 'Tags',
            accessor: 'tags',
            style: { minWidth: '225px' },
            Cell: (instance: { value: string[] }) => (
              <TagListCell value={instance.value} />
            ),
          },
        ]}
        data={data.quotes}
      />
    </div>
  );
};

export default IndividualAccountPage;
