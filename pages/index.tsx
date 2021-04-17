import PortfolioData from '../components/PortfolioData';
import TableSection from '../components/TableSection';
import Pill from '../components/Pill';

// TODO: index fund percentage
// TODO: add portfolio annual value chart
const HomePage = () => (
  <PortfolioData>
    {(data) => (
      <div>
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
        <TableSection
          header="Factor Tilts:"
          subheader="*Holdings can be in more than one factor."
          columns={[
            {
              Header: 'Factor',
              accessor: 'label',
              Cell: (instance: { value: string }) => (
                <div className="flex">
                  <Pill color="blue" content={instance.value} />
                </div>
              ),
            },
            { Header: 'Balance', accessor: 'value.display' },
            { Header: 'Weight', accessor: 'weight.display' },
          ]}
          data={data.stats.byFactor}
        />
        <TableSection
          header="Risk Levels:"
          columns={[
            {
              Header: 'Level',
              accessor: 'label',
            },
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
