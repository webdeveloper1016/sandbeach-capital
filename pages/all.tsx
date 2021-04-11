import PortfolioData from '../components/PortfolioData';
import { AccountTable } from '../components/AccountTable';
import {
  SymbolNameCell,
  TagCell,
  TagListCell,
  PercChangeCell,
} from '../components/TableCells';
import { PercChangeModel } from '../ts';

// TODO: view only taxable accounts
const AllAccountsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <div className="pb-4">
          <AccountTable
            columns={[
              { Header: 'Rank', accessor: 'rank' },
              {
                Header: 'Symbol',
                accessor: 'symbolCompany',
                Cell: (instance: {
                  value: { symbol: string; name: string };
                }) => (
                  <SymbolNameCell
                    value={instance.value}
                    maxWidth="sb-max-w-s"
                  />
                ),
                style: { minWidth: '135px' },
              },
              { Header: 'Equity', accessor: 'equity.display' },
              { Header: 'Weight', accessor: 'weight.display' },
              { Header: 'Target', accessor: 'targetPercent.display' },
              { Header: 'Shares', accessor: 'sharesDisplay.display' },
              {
                Header: 'Mkt Cap',
                accessor: 'stats.marketCap.display',
                // style: { minWidth: '135px' },
              },

              {
                Header: 'YTD',
                accessor: 'stats.ytdChange',
                Cell: (instance: { value: PercChangeModel }) => (
                  <PercChangeCell value={instance.value} />
                ),
              },
              { Header: 'Last', accessor: 'prices.latest.display' },
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
              { Header: 'Dividend', accessor: 'stats.dividendYield.display' },
              {
                Header: 'Sector',
                accessor: 'sector',
                style: { minWidth: '200px' },
              },
              {
                Header: 'Accounts',
                accessor: 'accountsJoined',
                style: { minWidth: '250px' },
              },
            ]}
            data={data.aggregatedHoldings}
          />
        </div>
      </div>
    )}
  </PortfolioData>
);

export default AllAccountsPage;
