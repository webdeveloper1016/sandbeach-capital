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
            { Header: 'Account', accessor: 'account' },
            { Header: 'Category', accessor: 'categoryLabel' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'portfolioWeight.display' },
            { Header: 'Institution', accessor: 'institution' },
            { Header: 'Risk', accessor: 'risk' },
          ]}
          data={data.accounts.allAccounts}
        />
        <Section>
          <Header size="text-2xl" content="Details:" />
          {data.accounts.allAccounts.map((a, k) => (
            <div className="px-2 pb-6 overflow-x-auto" key={k}>
              <Header
                size="text-lg"
                content={`Pie: ${a.account}`}
                subheader={`Goal: ${a.goal} | Risk Level: ${a.risk}`}
              />
              <Table
                layout="fixed"
                columns={[
                  { Header: 'Slice', accessor: 'nickname' },
                  { Header: 'Class', accessor: 'assetClass' },
                  { Header: 'Sector', accessor: 'sector' },
                  { Header: 'Approx Balance', accessor: 'approxVal.display' },
                  {
                    Header: 'Target Weight',
                    accessor: 'targetPercentDisplay.display',
                  },
                ]}
                data={a.pie}
              />
              {k + 1 !== data.accounts.allAccounts.length && (
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
