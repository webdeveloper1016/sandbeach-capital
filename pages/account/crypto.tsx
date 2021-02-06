import React from 'react';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import AccountWatchlistLinks from '../../components/AccountWatchlistLinks';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import Pill from '../../components/Pill';
import { AccountTable } from '../../components/AccountTable';
import useFetchCrypto from '../../hooks/useFetchCrypto';
import { AirTableAccountRoutes, PercChangeModel } from '../../ts';

const CryptoPage = () => {
  const { data, status } = useFetchCrypto();
  const [showStable, setShowStable] = React.useState(false);

  if (status === 'loading' || !data) {
    return <AccountViewSkeleton accountName={'crypto'} />;
  }

  if (status === 'error') {
    return <Error />;
  }

  console.log(data);

  return (
    <div>
      <AccountWatchlistLinks active={'crypto'} />
      <AccountBalanceHeader
        accountName={'crypto'}
        balance={
          showStable
            ? data.portfolioTotal.display
            : data.portfolioTotalExStable.display
        }
        percChange=""
        percClass=""
      />
      <AccountTable
        columns={[
          { Header: 'Symbol', accessor: 'symbol' },
          { Header: 'Price', accessor: 'priceDisplay.display' },
          { Header: 'Amount', accessor: 'shares' },
          { Header: 'Value', accessor: 'equity.display' },
          { Header: 'Weight', accessor: 'weight.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => {
              return (
                <div className={instance.value.class}>
                  {instance.value.perc.display}
                </div>
              );
            },
          },
          { Header: 'Volume', accessor: 'volumeDisplay.display' },
          {
            Header: 'Market Cap',
            accessor: 'marketCapDisplay.display',
            style: { minWidth: '135px' },
          },
          {
            Header: 'Max Supply',
            accessor: 'supplyDisplay.display',
            style: { minWidth: '170px' },
          },
          {
            Header: 'Accounts',
            accessor: 'accountTags',
            style: { minWidth: '170px' },
            // Cell: (instance: { value: string }) => (
            //   <div className="flex ">
            //     <Pill color="blue" content={instance.value} />
            //   </div>
            // ),
          },
        ]}
        data={data.coins}
        // data={showStable ? data.coins : data.coins.filter(c => !c.stablecoin)}
      />
    </div>
  );
};

export default CryptoPage;
