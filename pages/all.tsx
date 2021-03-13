import PortfolioData from '../components/PortfolioData';
import { AccountTable } from '../components/AccountTable';
import { SymbolNameCell, PercChangeCell } from '../components/TableCells';
import { PercChangeModel } from '../ts';

const AllAccountsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <div className="pb-4">
          <AccountTable
            columns={[
              {
                Header: 'Symbol',
                accessor: 'symbolCompany',
                Cell: (instance: {
                  value: { symbol: string; name: string };
                }) => <SymbolNameCell value={instance.value} />,
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
                Header: 'Market Cap',
                accessor: 'stats.marketCap.display',
                style: { minWidth: '135px' },
              },
              { Header: 'YTD', accessor: 'stats.ytdChange.display' },
            ]}
            data={data.aggregatedHoldings}
          />
        </div>
      </div>
    )}
  </PortfolioData>
);

export default AllAccountsPage;
