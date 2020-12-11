import React from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import GridList from '../components/GridList';
import Table from '../components/Table';
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
        <Table />
        <GridList headers={['Category', 'Balance', 'Weight']}>
          <>
            {data.categorySummary.map((c) => (
              <React.Fragment key={c.label}>
                <div>{c.label}</div>
                <div>{c.value.display}</div>
                <div>{c.weight.display}</div>
              </React.Fragment>
            ))}
          </>
        </GridList>
      </Section>
      <Section>
        <Header size="2xl" content="By Asset Class:" />
        <GridList headers={['Asset Class', 'Balance', 'Weight']}>
          <>
            {data.portfolioSectorWeights.map((c) => (
              <React.Fragment key={c.assetClass}>
                <div className="place-self-auto">{c.assetClass}</div>
                <div>{c.value.display}</div>
                <div>{c.weight.display}</div>
              </React.Fragment>
            ))}
          </>
        </GridList>
      </Section>
    </div>
  );
};

export default HomePage;
