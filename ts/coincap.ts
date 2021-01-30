import { NumberDisplayModel } from './types'
import { AirTableCryptoModelExtended } from './airtable'
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
  priceUsdNumber: number;
}

export interface EnrichedCryptoModel {
  coins: CoinCapAssetModel[];
  portfolioTotal: NumberDisplayModel;
  portfolioTotalExStable: NumberDisplayModel;
  holdingsByAccount: AirTableCryptoModelExtended[]
}
