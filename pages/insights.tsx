import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';
import Header from '../components/Header';
import Section from '../components/Section';

const InsightsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <TableSection
          header="Region Breakdown:"
          columns={[
            { Header: 'Region', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.insights.globalSplit}
          layout="fixed"
        />
        <TableSection
          header="Risk Breakdown:"
          columns={[
            { Header: 'Level', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.insights.riskSplit}
          layout="fixed"
        />
        <TableSection
          header="Active/Passive:"
          columns={[
            { Header: 'Type', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.insights.activeSplit}
          layout="fixed"
        />
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
