import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';

const HomePage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <TableSection
          header="Time Horizon:"
          columns={[
            { Header: 'Category', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.categorySummary}
        />
        <TableSection
          header="Asset Class:"
          columns={[
            { Header: 'Asset Class', accessor: 'assetClass' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.portfolioSectorWeights}
        />
        <TableSection
          header="Slices:"
          subheader="*Holdings can be in more than one slice."
          columns={[
            { Header: 'Region', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.insights.factors}
          layout="fixed"
        />
        <TableSection
          header="Risk Levels:"
          columns={[
            { Header: 'Level', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.insights.riskSplit}
          layout="fixed"
        />
      </div>
    )}
  </PortfolioData>
);

export default HomePage;
