import _ from 'lodash';
import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';
import Header from '../components/Header';
import Section from '../components/Section';
import { Table } from '../components/Table';

const AccountsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <TableSection
          header="Overview:"
          columns={[
            { Header: 'Account', accessor: 'nickname' },
            { Header: 'Category', accessor: 'timeframe' },
            { Header: 'Balance', accessor: 'totalValue.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts}
        />
        <Section>
          <Header size="text-2xl" content="Details:" />
          {data.accounts.map((a, k) => (
            <div className="px-2 pb-6 overflow-x-auto" key={k}>
              <Header
                size="text-lg"
                content={`${a.nickname} | ${a.totalValue.display}`}
                // subheader={`Goal: ${a.goal} | Risk Level: ${a.risk}`}
              />
              <Table
                layout="fixed"
                columns={_.compact([
                  { Header: 'Symbol', accessor: 'symbol' },
                  { Header: 'Shares', accessor: 'shares' },
                  { Header: 'Equity', accessor: 'sliceTotalValue.display' },
                  { Header: 'Class', accessor: 'assetClass' },
                  !a.crypto ? { Header: 'Sector', accessor: 'sector' } : null,
                ])}
                data={a.pie}
              />
              {k + 1 !== data.accounts.length && (
                <div className="border-b mx-8 mt-6 border-green-500" />
              )}
            </div>
          ))}
        </Section>
      </div>
    )}
  </PortfolioData>
);

export default AccountsPage;
