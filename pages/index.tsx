import React from 'react';
import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';
import { ProgressBar } from '../components/ProgressBar';
import Section from '../components/Section';
import Header from '../components/Header';
import { currencyFormatter, percentDisplay } from '../utils/calc';
import { APIPortfolioModel } from '../ts';

const Goal = ({ data }: { data: APIPortfolioModel }) => {
  const goal = React.useMemo(() => {
    const perc = percentDisplay(
      data.summary.portfolioTotal.val,
      data.config.portfolioValueGoal,
    );
    return {
      perc,
      title: `${currencyFormatter.format(data.config.portfolioValueGoal)} | ${
        perc.display
      }`,
    };
  }, [data]);

  return (
    <div >
      <Section noBorder>
        <Header content="Savings Goal:" size="text-2xl" />
        <ProgressBar title={goal.title} progress={goal.perc.val * 100} />
      </Section>
    </div>
  );
};

// TODO: add portfolio annual value chart
const HomePage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <Goal data={data} />
        <TableSection
          header="Cash Equivalents:"
          columns={[
            { Header: 'Asset Class', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byCashEq}
        />
        <TableSection
          header="Time Horizon:"
          columns={[
            { Header: 'Category', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byTimeFrame}
        />
        <TableSection
          header="Asset Class:"
          columns={[
            { Header: 'Asset Class', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byAssetClass}
        />
      </div>
    )}
  </PortfolioData>
);

export default HomePage;
