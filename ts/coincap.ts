import { NumberDisplayModel, PercChangeModel } from './types';
import { AirTableCryptoModelExtended } from './airtable';
export interface AssetModel {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}
export interface CoinCapAssetRespModel {
  data: AssetModel[];
  timestamp: number;
}

export interface CoinCapAssetModel extends AssetModel {
  symbolName: {
    symbol: string;
    name: string;
    urls: {
      coincap: string;
      messari: string;
    };
  };
  priceDisplay: NumberDisplayModel;
  marketCapDisplay: NumberDisplayModel;
  volumeDisplay: NumberDisplayModel;
  changePercent: PercChangeModel;
  supplyDisplay: NumberDisplayModel;
}

export interface CoinCapAssetModelExteded extends CoinCapAssetModel {
  stablecoin: boolean;
  weight: NumberDisplayModel;
  weightExStable: NumberDisplayModel;
  accountTags: string[];
  totalAmount: NumberDisplayModel;
  totalValue: NumberDisplayModel;
  assetClass: string;
  targetPercent?: number;
}

export interface EnrichedCryptoModel {
  coins: CoinCapAssetModelExteded[];
  coinsWithAmount: CoinCapAssetModelExteded[];
  portfolioTotal: NumberDisplayModel;
  portfolioTotalExStable: NumberDisplayModel;
  holdingsByAccount: AirTableCryptoModelExtended[];
}
