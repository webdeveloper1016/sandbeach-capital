import {
  AirTableCryptoModel,
  CoinCapAssetModel,
  EnrichedCryptoModel,
} from '../ts';
import { currencyDisplay, percentDisplay, numberDisplayLong } from './calc';

export const enrichCrypto = (
  holdings: AirTableCryptoModel[],
  prices: CoinCapAssetModel[],
): EnrichedCryptoModel => {
  const coins = prices.map((p) => {
    const accounts = holdings.filter((h) => h.coin === p.id);
    const totalAmount = accounts.reduce(
      (accum, current) => accum + current.amount,
      0,
    );
    return {
      ...p,
      stablecoin: Boolean(accounts.find((l) => l.assetClass === 'Stablecoin')),
      accounts,
      totalAmount: numberDisplayLong(totalAmount),
      totalValue: currencyDisplay(totalAmount * p.priceDisplay.val),
      accountTags: accounts.map((a) => a.account),
    };
  });

  const holdingsByAccount = holdings.map((h) => ({
    ...h,
    sliceTotalValue: currencyDisplay(
      prices.find((p) => p.id === h.coin)?.priceDisplay.val * h.amount,
    ),
    sliceWeight: percentDisplay(1, 1),
  }));

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
    coins: coinsWithWeight,
    coinsWithAmount: coinsWithWeight.filter((c) => c.totalValue.val > 0),
    holdingsByAccount,
    portfolioTotal: currencyDisplay(portfolioTotal),
    portfolioTotalExStable: currencyDisplay(portfolioTotalExStable),
  };
};
