import {
  AirTableCryptoModel,
  CoinCapAssetModel,
  EnrichedCryptoModel,
} from '../ts';
import { currencyDisplay } from './calc';

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
      stablecoin: Boolean(accounts.find((l) => l.stablecoin)),
      accounts,
      totalAmount,
      totalValue: totalAmount * p.priceUsdNumber,
    };
  });

  const holdingsByAccount = holdings.map((h) => ({
    ...h,
    sliceTotalValue: prices.find((p) => p.id === h.coin)?.priceUsdNumber * h.amount,
  }));

  const portfolioTotal = coins.reduce(
    (accum, current) => accum + current.totalValue,
    0,
  );

  const portfolioTotalExStable = coins
    .filter((c) => !c.stablecoin)
    .reduce((accum, current) => accum + current.totalValue, 0);

  return {
    holdingsByAccount,
    portfolioTotal: currencyDisplay(portfolioTotal),
    portfolioTotalExStable: currencyDisplay(portfolioTotalExStable),
    coins,
  };
};
