export interface AssetModel {
  // id: string;
  // symbol: string;
  // name: string;
  // priceUsd: string;
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
}
export interface CoinCapAssetRespModel {
  data: AssetModel[];
  timestamp: number;
}

export interface CoinCapAssetModel extends AssetModel {
  priceUsdNumber: number;
}
