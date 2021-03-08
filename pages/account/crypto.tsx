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
import useFetchCrypto from '../../hooks/useFetchCrypto';
import { PercChangeModel } from '../../ts';

const CryptoPage = () => {
  const { data, status } = useFetchCrypto();
  // TODO: add radio button to toggle stablecoins
  const [showStable, setShowStable] = React.useState(false);

  const handleToggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowStable(event.target.checked);
  };

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
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          onChange={handleToggleCheckbox}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer foucus:outline-none"
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        >
          Show Stablecoins
        </label>
      </div>
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
