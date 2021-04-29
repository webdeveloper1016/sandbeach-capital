import _ from 'lodash';
import {
  AirTableCryptoModel,
  CoinMarketCapAssetModel,
  CoinMarketCapAssetModelExteded,
  CMCEnrichedCryptoModel,
  IexStockQuoteDetailedModelEnriched,
  AirTableConfigModelExtended,
} from '../ts';
import { currencyDisplay, percentDisplay, numberDisplayLong } from './calc';

export const enrichCrypto = (
  holdings: AirTableCryptoModel[],
  prices: CoinMarketCapAssetModel[],
  config: AirTableConfigModelExtended,
): CMCEnrichedCryptoModel => {
  const coins = prices.map((p) => {
    const accounts = holdings.filter((h) => h.coin === p.slug);
    const totalAmount = accounts.reduce(
      (accum, current) => accum + current.amount,
      0,
    );
    return {
      ...p,
      stablecoin: Boolean(
        accounts.find((l) => l.subAssetClass === 'Stablecoin'),
      ),
      accounts,
      assetClass: accounts.find((l) => l.assetClass).assetClass,
      totalAmount: numberDisplayLong(totalAmount),
      totalValue: currencyDisplay(totalAmount * p.priceDisplay.val),
      accountTags: accounts.map((a) => a.account),
      targetPercent: accounts.find((l) => l.assetClass).targetPercent,
    };
  });

  const holdingsByAccount = holdings.map((h) => {
    const price = prices.find((p) => p.slug === h.coin)?.priceDisplay.val;
    const totalVal = price ? price * h.amount : 0;

    return {
      ...h,
      sliceTotalValue: currencyDisplay(totalVal),
      sliceWeight: percentDisplay(1, 1),
    };
  });

  const portfolioTotal = coins.reduce(
    (accum, current) => accum + current.totalValue.val,
    0,
  );

  const portfolioTotalExStable = coins
    .filter((c) => !c.stablecoin)
    .reduce((accum, current) => accum + current.totalValue.val, 0);

  const coinsWithWeight = coins.map((c) => ({
    ...c,
    weight: percentDisplay(c.totalValue.val, portfolioTotal),
    weightExStable: percentDisplay(c.totalValue.val, portfolioTotalExStable),
  }));

  return {
    coins: _.orderBy(coinsWithWeight, ['totalValue.val'], ['desc']),
    coinsWithAmount: _.orderBy(
      coinsWithWeight.filter((c) => c.totalValue.val > 0),
      ['totalValue.val'],
      ['desc'],
    ),
    holdingsByAccount,
    portfolioTotal: currencyDisplay(portfolioTotal),
    portfolioTotalExStable: currencyDisplay(portfolioTotalExStable),
    config,
  };
};

export const mapCryptoToIEX = (
  data: CoinMarketCapAssetModelExteded[],
  portfolioTotal: number,
): IexStockQuoteDetailedModelEnriched[] => {
  const holdings = data.map((c) => ({
    symbol: c.symbol,
    companyName: c.name,
    symbolCompany: {
      symbol: c.symbol,
      name: c.name,
    },
    shares: c.totalAmount.val,
    sharesDisplay: c.totalAmount,
    equity: c.totalValue,
    prices: {
      previousClose: c.priceDisplay,
      open: c.priceDisplay,
      high: c.priceDisplay,
      low: c.priceDisplay,
      close: c.priceDisplay,
      latest: c.priceDisplay,
    },
    volume: {
      prev: c.volumeDisplay,
      current: c.volumeDisplay,
    },
    change: currencyDisplay(0),
    changePercent: c.changePercent,
    equityPrevClose: c.totalValue,
    stats: {
      marketCap: c.marketCapDisplay,
      peRatio: 0,
      week52High: currencyDisplay(0),
      week52Low: currencyDisplay(0),
      week52Range: '-',
      week52OffHighPercent: {
        perc: { display: '-', val: 0 },
        class: '',
      },
      ytdChange: {
        perc: { display: '-', val: 0 },
        class: '',
      },
      dividendYield: { val: 0, display: '-' },
      nextDividendDate: '-',
      nextEarningsDate: '-',
      beta: { val: 0, display: '-' },
    },
    logo: null,
    sector: c.assetClass,
    accounts: c.accountTags,
    accountsJoined: c.accountTags.join(', '),
    exclude: false,
    targetPercent: c.targetPercent
      ? percentDisplay(c.targetPercent, 1)
      : { val: 0, display: '-' },
    weight: percentDisplay(c.totalValue.val, portfolioTotal),
  }));

  return holdings;
};
