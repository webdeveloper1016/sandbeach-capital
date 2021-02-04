import { currencyDisplay, percentDisplay } from './calc';
import { AssetModel, CoinCapAssetModel } from '../ts';

export const formatCoincap = (data: AssetModel[]): CoinCapAssetModel[] => {
  return data.map((i) => ({
    ...i,
    priceUsdNumber: Number(i.priceUsd),
    priceDisplay: currencyDisplay(Number(i.priceUsd)).display,
  }));
};
