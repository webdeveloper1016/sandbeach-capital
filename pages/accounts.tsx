import Status from '../components/Status';
import Header from '../components/Header';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import { Table } from '../components/Table';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const AccountsPage = () => {
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
            <Table
              columns={[
                { Header: 'Account', accessor: 'account' },
                { Header: 'Category', accessor: 'categoryLabel' },
                { Header: 'Balance', accessor: 'value.display' },
                { Header: 'Weight', accessor: 'portfolioWeight.display' },
                { Header: 'Institution', accessor: 'institution' },
                { Header: 'Risk', accessor: 'risk' },
              ]}
              data={data.allAccounts}
            />
          </Section>
        </div>
      )}
    </Status>
  );
};

export default AccountsPage;
