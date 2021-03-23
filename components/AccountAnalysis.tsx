import React from 'react';
import { useRouter } from 'next/router';
import AccountWatchlistLinks from '../components/AccountWatchlistLinks';
import { AccountBalanceHeader } from '../components/AccountBalanceHeader';
import {
  SymbolNameCell,
  TagCell,
  TagListCell,
  PercChangeCell,
} from '../components/TableCells';
import { AccountTable } from '../components/AccountTable';
import { PercChangeModel } from '../ts';
import { enrichDetailedQuotes } from '../utils/enrich-detailed-quote';
import { APIPortfolioModel } from '../ts';

const AccountAnalysis = ({
  portfolioData,
}: {
  portfolioData: APIPortfolioModel;
}) => {
  const router = useRouter();
  const account = router.query.account as string;
  const data = React.useMemo(() => {
    const { supportingData, ...rest } = portfolioData;
    return enrichDetailedQuotes(
      supportingData.airtable.pies.filter((x) => x.account === account),
      supportingData.quotes,
      rest,
      account,
    );
  }, [portfolioData, account]);

  if (!data) {
    return <div>404</div>;
  }

  return (
    <div>
      <AccountWatchlistLinks active={account} items={data.menuItems}/>
      <AccountBalanceHeader
        nickname={account}
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

export default AccountAnalysis;
