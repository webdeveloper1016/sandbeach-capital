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
import { enrichDetailedQuotes } from '../utils/enrich-detailed-quote';
import { percChangeSort, numberDisplaySort } from '../utils/calc';
import { APIPortfolioModel, PercChangeModel, NumberDisplayModel } from '../ts';
import { aggregateAccount } from '../config';

const AccountAnalysis = ({
  portfolioData,
}: {
  portfolioData: APIPortfolioModel;
}) => {
  const router = useRouter();
  const account = router.query.account as string;
  const data = React.useMemo(() => {
    const { supportingData, ...rest } = portfolioData;
    const piesToAnalyze = aggregateAccount.includes(account) // this will get robinhood-efts and robinhood-stocks
      ? {
          aggregated: true,
          data: supportingData.airtable.pies.filter((x) =>
            x.account.includes(account),
          ),
        }
      : {
          aggregated: false,
          data: supportingData.airtable.pies.filter(
            (x) => x.account === account,
          ),
        };
    return enrichDetailedQuotes(
      piesToAnalyze.data,
      supportingData.quotes,
      rest,
      account,
      piesToAnalyze.aggregated,
    );
  }, [portfolioData, account]);

  if (!data) {
    return <div>404</div>;
  }

  return (
    <div>
      <AccountWatchlistLinks active={account} items={data.menuItems} />
      <AccountBalanceHeader
        nickname={data.account.nickname || ""}
        subheader={data.account.description}
        balance={data.summary.balanceDisplay}
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
          { Header: 'Last', accessor: 'prices.latest.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
            sortType: (row1, row2, id) =>
              percChangeSort(row1.values[id], row2.values[id]),
          },
          { Header: 'Equity', accessor: 'equity.display' },
          { Header: 'Weight', accessor: 'weight.display' },
          { Header: 'Target', accessor: 'slicePercent.display' },
          { Header: 'Shares', accessor: 'shares' },
          {
            Header: 'Vol',
            accessor: 'volume.current',
            Cell: (instance: { value: { display: string } }) => (
              <span>{instance.value.display}</span>
            ),
            sortType: (row1, row2, id) =>
              numberDisplaySort(row1.values[id], row2.values[id]),
          },
          {
            Header: 'Cap',
            accessor: 'stats.marketCap',
            Cell: (instance: { value: { display: string } }) => (
              <span>{instance.value.display}</span>
            ),
            sortType: (row1, row2, id) =>
              numberDisplaySort(row1.values[id], row2.values[id]),
          },
          {
            Header: 'YTD',
            accessor: 'stats.ytdChange',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
            sortType: (row1, row2, id) =>
              percChangeSort(row1.values[id], row2.values[id]),
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
            sortType: (row1, row2, id) =>
              percChangeSort(row1.values[id], row2.values[id]),
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
            style: { minWidth: '175px' },
            Cell: (instance: { value: string[] }) => (
              <TagListCell value={instance.value} />
            ),
          },
          { Header: 'Yield', accessor: 'stats.dividendYield.display' },
          { Header: 'Next Dividend', accessor: 'stats.nextDividendDate' },
          { Header: 'Next Earnings', accessor: 'stats.nextEarningsDate' },
        ]}
        data={data.quotes}
      />
    </div>
  );
};

export default AccountAnalysis;
