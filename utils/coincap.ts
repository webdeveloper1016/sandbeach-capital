import {
  currencyDisplay,
  percentDisplay,
  numberDisplay,
  percDisplayWithClass,
} from './calc';
import { AssetModel, CoinCapAssetModel } from '../ts';

export const formatCoincap = (data: AssetModel[]): CoinCapAssetModel[] => {
  return data.map((i) => ({
    ...i,
    symbolName: {
      symbol: i.symbol,
      name: i.name,
      urls: {
        coincap: `https://coincap.io/assets/${i.id}`,
        messari: `https://messari.io/asset/${i.id}`,
      },
    },
    priceDisplay: currencyDisplay(Number(i.priceUsd)),
    marketCapDisplay: numberDisplay(Number(i.marketCapUsd)),
    volumeDisplay: numberDisplay(Number(i.volumeUsd24Hr)),
    changePercent: percDisplayWithClass(Number(i.changePercent24Hr), 100, true),
    supplyDisplay:
      Number(i.maxSupply) === 0
        ? { val: Number(i.maxSupply), display: '∞' }
        : numberDisplay(Number(i.maxSupply)),
  }));
};
