import _ from 'lodash';
import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';
import { AccountTable } from '../components/AccountTable';

// TODO: limit to top five holdings
// TODO: filter out zero balance holdings
// TODO: use new table layout
const AccountsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <div className="pb-4">
          <AccountTable
            columns={[
              { Header: 'Account', accessor: 'nickname' },
              { Header: 'Category', accessor: 'timeframe' },
              { Header: 'Balance', accessor: 'totalValue.display' },
              { Header: 'Portfolio Weight', accessor: 'weight.display' },
            ]}
            data={data.accounts}
          />
        </div>
        <div>
          <Section>
            <Header size="text-2xl" content="Details:" />
            {data.accounts.map((a, k) => (
              <div className="px-2 pb-6 overflow-x-auto" key={k}>
                <Header
                  size="text-lg"
                  content={`${a.nickname} | ${a.totalValue.display}`}
                />
                <AccountTable
                  columns={_.compact([
                    { Header: 'Symbol', accessor: 'symbol' },
                    { Header: 'Shares', accessor: 'shares' },
                    { Header: 'Equity', accessor: 'sliceTotalValue.display' }, //sliceWeight
                    { Header: 'Weight', accessor: 'sliceWeight.display' },
                    !a.crypto ? { Header: 'Sector', accessor: 'sector' } : null,
                  ])}
                  data={a.pie}
                />
              </div>
            ))}
          </Section>
        </div>
      </div>
    )}
  </PortfolioData>
);

export default AccountsPage;
