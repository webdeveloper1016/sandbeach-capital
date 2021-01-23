import { AirTableCryptoModel } from '../ts/airtable';
import { CoinCapAssetModel } from '../ts/coincap';

export const enrichCrypto = (
  holdings: AirTableCryptoModel[],
  prices: CoinCapAssetModel[],
) => {
  const values = holdings.map((h) => {
    return {
      ...h,
      price: prices.find((p) => p.id === h.Coin),
    };
  });

  return values;
};
