import Status from '../components/Status';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const HomePage = () => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <div>
          <PageTitle
            title="Total Portfolio Value:"
            subtitle={data.accounts.totalBalance.display}
          />
          <Section>
            <Header size="2xl" content="By Time Horizon:" />
            <Table
              columns={[
                { Header: 'Category', accessor: 'label' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'weight.display' },
              ]}
              data={data.accounts.categorySummary}
            />
          </Section>
          <Section>
            <Header size="2xl" content="By Asset Class:" />
            <Table
              columns={[
                { Header: 'Asset Class', accessor: 'assetClass' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'weight.display' },
              ]}
              data={data.accounts.portfolioSectorWeights}
            />
          </Section>
        </div>
      )}
    </Status>
  );
};

export default HomePage;
