import Status from '../components/Status';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const InsightsPage = () => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <div>
          <PageTitle
            title="Total Portfolio Value:"
            subtitle={data.totalBalance.display}
          />
          <Section>
            <Header size="2xl" content="Region Breakdown:" />
            <Table
              columns={[
                { Header: 'Region', accessor: 'label' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'weight.display' },
              ]}
              data={data.insights.globalSplit}
            />
          </Section>
          <Section>
            <Header size="2xl" content="Risk Breakdown:" />
          </Section>
          <Section>
            <Header size="2xl" content="Sector Breakdown:" />
          </Section>
          <Section>
            <Header size="2xl" content="Active/Passive:" />
          </Section>
        </div>
      )}
    </Status>
  );
};

export default InsightsPage;
