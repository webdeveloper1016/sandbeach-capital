import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';

const HomePage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <TableSection
          header="By Time Horizon:"
          columns={[
            { Header: 'Category', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.categorySummary}
        />
        <TableSection
          header="By Asset Class:"
          columns={[
            { Header: 'Asset Class', accessor: 'assetClass' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.accounts.portfolioSectorWeights}
        />
      </div>
    )}
  </PortfolioData>
);

export default HomePage;
