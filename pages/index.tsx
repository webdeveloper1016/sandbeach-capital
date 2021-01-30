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
        <TableSection
          header="Factor Tilts:"
          subheader="*Holdings can be in more than one factor."
          columns={[
            { Header: 'Factor', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byFactor}
        />
        <TableSection
          header="Risk Levels:"
          columns={[
            { Header: 'Level', accessor: 'label' },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byRisk}
        />
        <TableSection
          header="Savings Details:"
          columns={[
            { Header: 'Label', accessor: 'label' },
            { Header: 'Amount', accessor: 'value.display' },
          ]}
          data={data.stats.byContribution}
        />
      </div>
    )}
  </PortfolioData>
);

export default HomePage;
