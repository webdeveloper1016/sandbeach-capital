import Status from '../components/Status';
import Header from '../components/Header';
import Section from '../components/Section';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const HomePage = () => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <>
          <div className="mb-5">
            <Header size="2xl" content="Total Portfolio Value:" />
            <Header size="5xl" content={data.totalBalance.display} noGutter />
          </div>
          <Section>
            <Header size="2xl" content="By Time Horizon:" />
            <Table
              columns={[
                { Header: 'Category', accessor: 'label' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'weight.display' },
              ]}
              data={data.categorySummary}
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
              data={data.portfolioSectorWeights}
            />
          </Section>
        </>
      )}
    </Status>
  );
};

export default HomePage;
