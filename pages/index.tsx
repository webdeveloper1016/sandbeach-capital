import React from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const HomePage = () => {
  const { data, status } = useFetchPortfolio();

  if (status === 'loading') {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
