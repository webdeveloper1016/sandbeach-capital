import React, { ChangeEventHandler } from 'react';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import AccountWatchlistLinks from '../../components/AccountWatchlistLinks';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import {
  SymbolNameCell,
  TagListCell,
  PercChangeCell,
} from '../../components/TableCells';
import { AccountTable } from '../../components/AccountTable';
import { ToggleCheckbox } from '../../components/ToggleCheckbox';
import useFetchCrypto from '../../hooks/useFetchCrypto';
import { PercChangeModel } from '../../ts';

const CryptoPage = () => {
  // hooks
  const { data, status } = useFetchCrypto();

  // state
  const [showStable, setShowStable] = React.useState(false);

  // functions
  const handleToggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowStable(event.target.checked);
  };

  // render
  if (status === 'loading' || !data) {
    return <AccountViewSkeleton accountName={'crypto'} />;
  }

  if (status === 'error') {
    return <Error />;
  }

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
      <ToggleCheckbox
        id="stablecoins"
        label="Show Stablecoins"
        onChange={handleToggleCheckbox}
      />
      <AccountTable
        columns={[
          {
            Header: 'Symbol',
            accessor: 'symbolName',
            Cell: (instance: { value: { symbol: string; name: string } }) => (
              <SymbolNameCell value={instance.value} />
            ),
          },
          { Header: 'Price', accessor: 'priceDisplay.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          { Header: 'Equity', accessor: 'totalValue.display' },
          {
            Header: 'Weight',
            accessor: showStable ? 'weight.display' : 'weightExStable.display',
          },
          { Header: 'Amount', accessor: 'totalAmount.display' },
          { Header: 'Volume', accessor: 'volumeDisplay.display' },
          {
            Header: 'Market Cap',
            accessor: 'marketCapDisplay.display',
            style: { minWidth: '135px' },
          },
          { Header: 'Rank', accessor: 'rank' },
          {
            Header: 'Max Supply',
            accessor: 'supplyDisplay.display',
            style: { minWidth: '170px' },
          },
          {
            Header: 'Accounts',
            accessor: 'accountTags',
            style: { minWidth: '340px' },
            Cell: (instance: { value: string[] }) => (
              <TagListCell value={instance.value} />
            ),
          },
        ]}
        data={
          showStable
            ? data.coinsWithAmount
            : data.coinsWithAmount.filter((c) => !c.stablecoin)
        }
      />
    </div>
  );
};

export default CryptoPage;
