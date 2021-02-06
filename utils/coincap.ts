import { currencyDisplay, percentDisplay, numberDisplay } from './calc';
import { AssetModel, CoinCapAssetModel } from '../ts';

export const formatCoincap = (data: AssetModel[]): CoinCapAssetModel[] => {
  return data.map((i) => ({
    ...i,
    symbolName: {
      symbol: i.symbol,
      name: i.name,
    },
    priceDisplay: currencyDisplay(Number(i.priceUsd)),
    marketCapDisplay: numberDisplay(Number(i.marketCapUsd)),
    volumeDisplay: numberDisplay(Number(i.volumeUsd24Hr)),
    changePercent: {
      class:
        Number(i.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500',
      perc: percentDisplay(Number(i.changePercent24Hr), 100, true),
    },
    supplyDisplay:
      Number(i.maxSupply) === 0
        ? { val: Number(i.maxSupply), display: '∞' }
        : numberDisplay(Number(i.maxSupply)),
  }));
};
