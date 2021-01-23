// import _ from 'lodash';
import { AirTableCryptoModel } from '../ts/airtable';
import { CoinCapAssetModel } from '../ts/coincap';

export const enrichCrypto = (
  holdings: AirTableCryptoModel[],
  prices: CoinCapAssetModel[],
) => {
  const coins = prices.map((p) => {
    const locations = holdings.filter((h) => h.Coin === p.id);
    const totalAmount = locations.reduce(
      (accum, current) => accum + current.Amount,
      0,
    );
    return {
      ...p,
      stablecoin: Boolean(locations.find((l) => l.Stablecoin)),
      locations,
      totalAmount,
      totalValue: totalAmount * p.priceUsdNumber,
    };
  });

  const portfolioTotal = coins.reduce(
    (accum, current) => accum + current.totalValue,
    0,
  );

  const portfolioTotalExStable = coins
    .filter((c) => !c.stablecoin)
    .reduce((accum, current) => accum + current.totalValue, 0);

  return { portfolioTotal, portfolioTotalExStable, coins };
};
