import Status from '../components/Status';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const AccountsPage = () => {
  const { data, status } = useFetchPortfolio();
  console.log(data);

  return (
    <Status status={status}>
      {data && (
        <div>
          <PageTitle
            title="Total Portfolio Value:"
            subtitle={data.totalBalance.display}
          />
          <Section>
            <Header size="2xl" content="Overview:" />
            <Table
              columns={[
                { Header: 'Account', accessor: 'account' },
                { Header: 'Category', accessor: 'categoryLabel' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'portfolioWeight.display' },
                { Header: 'Institution', accessor: 'institution' },
                { Header: 'Risk', accessor: 'risk' },
              ]}
              data={data.allAccounts}
            />
          </Section>
          <Section>
            <Header size="2xl" content="Details:" />
            {data.allAccounts.map((a, k) => (
              <div className="px-2 pb-6" key={k}>
                <Header
                  size="lg"
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
                {k + 1 !== data.allAccounts.length && (
                  <div className="border-b mx-8 mt-6 border-green-500" />
                )}
              </div>
            ))}
          </Section>
        </div>
      )}
    </Status>
  );
};

export default AccountsPage;
