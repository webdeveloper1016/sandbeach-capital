import React from 'react';
import Link from 'next/link';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import Section from '../../components/Section';
import Header from '../../components/Header';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import { SymbolNameCell, PercChangeCell } from '../../components/TableCells';
import { AccountTable } from '../../components/AccountTable';
import { ToggleCheckbox } from '../../components/ToggleCheckbox';
import { ProgressBar } from '../../components/ProgressBar';
import useFetchCrypto from '../../hooks/useFetchCrypto';
import { currencyFormatter, numberDisplayLong } from '../../utils/calc';
import { PercChangeModel, CoinMarketCapAssetModelExteded } from '../../ts';

const BtcProgress = ({
  data,
  tgt,
  title,
}: {
  data: CoinMarketCapAssetModelExteded[];
  tgt: number;
  title: string;
}) => {
  const { goal, away, amt, milestone } = React.useMemo(() => {
    const currentBtc = data.find((x) => x.slug === 'bitcoin');
    const away = tgt - currentBtc.totalAmount.val;
    const amt = currentBtc.priceDisplay.val * away;
    const milestone = (currentBtc.totalAmount.val / tgt) * 100;
    return {
      goal: tgt,
      away,
      amt,
      milestone,
    };
  }, [data]);

  return (
    <ProgressBar
      title={`${title}: ${goal} BTC | ${
        numberDisplayLong(away).display
      } | ${currencyFormatter.format(amt)}`}
      progress={milestone}
    />
  );
};

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
    return <AccountViewSkeleton />;
  }

  if (status === 'error') {
    return <Error />;
  }

  return (
    <div>
      <AccountBalanceHeader
        nickname="Crypto"
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
      <Section>
        <Header content="Bitcoin Goals" size="text-xl" />
        <BtcProgress
          title="Next"
          data={data.coinsWithAmount}
          tgt={data.config.btcGoalShort}
        />
        <BtcProgress
          title="2021"
          data={data.coinsWithAmount}
          tgt={data.config.btcGoalLong}
        />
      </Section>
      <AccountTable
        columns={[
          {
            Header: 'Symbol',
            accessor: 'symbolName',
            Cell: (instance: { value: { symbol: string; name: string } }) => (
              <Link href={`/account/crypto/${instance.value.symbol}`}>
                <a>
                  <SymbolNameCell value={instance.value} />
                </a>
              </Link>
            ),
          },
          { Header: 'Price', accessor: 'priceDisplay.display' },

          { Header: 'Equity', accessor: 'totalValue.display' },
          {
            Header: 'Day',
            accessor: 'changePercent',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          {
            Header: 'Week',
            accessor: 'changePercentWeek',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          {
            Header: 'Month',
            accessor: 'changePercentMo',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          {
            Header: '3 Month',
            accessor: 'changePercentThreeMo',
            Cell: (instance: { value: PercChangeModel }) => (
              <PercChangeCell value={instance.value} />
            ),
          },
          { Header: 'Amount', accessor: 'totalAmount.display' },
          {
            Header: 'Weight',
            accessor: showStable ? 'weight.display' : 'weightExStable.display',
          },

          // { Header: 'Volume', accessor: 'volumeDisplay.display' },
          {
            Header: 'Cap',
            accessor: 'marketCapDisplay.display',
            style: { minWidth: '135px' },
          },
          { Header: 'Rank', accessor: 'rank' },
          {
            Header: 'Max Supply',
            accessor: 'supplyDisplay.display',
            style: { minWidth: '170px' },
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
