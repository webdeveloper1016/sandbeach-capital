import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';

const InsightsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <PageTitle
          title="Total Portfolio Value:"
          subtitle={data.accounts.totalBalance.display}
        />
        <Section>
          <Header size="2xl" content="Region Breakdown:" />
          <Table
            columns={[
              { Header: 'Region', accessor: 'label' },
              { Header: 'Balance', accessor: 'value.display' },
              { Header: 'Weight', accessor: 'weight.display' },
            ]}
            data={data.accounts.insights.globalSplit}
            layout="fixed"
          />
        </Section>
        <Section>
          <Header size="2xl" content="Risk Breakdown:" />
          <Table
            columns={[
              { Header: 'Level', accessor: 'label' },
              { Header: 'Balance', accessor: 'value.display' },
              { Header: 'Weight', accessor: 'weight.display' },
            ]}
            data={data.accounts.insights.riskSplit}
            layout="fixed"
          />
        </Section>
        <Section>
          <Header size="2xl" content="Active/Passive:" />
          <Table
            columns={[
              { Header: 'Type', accessor: 'label' },
              { Header: 'Balance', accessor: 'value.display' },
              { Header: 'Weight', accessor: 'weight.display' },
            ]}
            data={data.accounts.insights.activeSplit}
            layout="fixed"
          />
        </Section>
        <Section>
          <Header size="2xl" content="Growth/Value:" />
        </Section>
        <Section>
          <Header size="2xl" content="Sector Breakdown:" />
        </Section>
      </div>
    )}
  </PortfolioData>
);

export default InsightsPage;
