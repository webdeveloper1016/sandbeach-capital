import _ from 'lodash';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';
import { AccountTable } from '../components/AccountTable';

// TODO: add scroll to top of pg functionality
const AccountsPage = () => (
  <PortfolioData>
    {(data) => (
      <div>
        <div className="pb-4">
          <AccountTable
            columns={[
              {
                Header: 'Account',
                accessor: 'nicknameId',
                Cell: (instance: {
                  value: { nickname: string; id: string };
                }) => (
                  <AnchorLink href={`#${instance.value.id}`}>
                    {instance.value.nickname}
                  </AnchorLink>
                ),
              }, //institution
              { Header: 'Institution', accessor: 'institution' }, //institution
              { Header: 'Category', accessor: 'timeframe' },
              { Header: 'Balance', accessor: 'totalValue.display' },
              { Header: 'Portfolio Weight', accessor: 'weight.display' },
            ]}
            data={data.accounts}
          />
        </div>
        <div>
          <Section>
            <Header size="text-2xl" content="Details:" />
            {data.accounts.map((a, k) => (
              <div className="px-2 pb-6 overflow-x-auto" key={k}>
                <Header
                  id={a.id}
                  size="text-lg"
                  content={`${a.nickname} | ${a.totalValue.display}`}
                  subheader={
                    a.pieSlimTopOnly
                      ? `* Displaying ${a.pieSlimTopOnlyCount} top holdings only`
                      : undefined
                  }
                />
                <AccountTable
                  columns={_.compact([
                    { Header: 'Symbol', accessor: 'symbol' },
                    { Header: 'Shares', accessor: 'shares' },
                    { Header: 'Equity', accessor: 'sliceTotalValue.display' }, //sliceWeight
                    { Header: 'Weight', accessor: 'sliceWeight.display' },
                    !a.crypto ? { Header: 'Sector', accessor: 'sector' } : null,
                  ])}
                  data={a.pieSlim}
                />
              </div>
            ))}
          </Section>
        </div>
      </div>
    )}
  </PortfolioData>
);

export default AccountsPage;
