import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';

const HomePage = () => (
  <PortfolioData>
    {(data) => (
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
  </PortfolioData>
);

export default HomePage;
