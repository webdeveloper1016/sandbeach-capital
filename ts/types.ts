export type CategoryType = 'short-term' | 'long-term' | 'retirement';

export type StockAssetClassType =
  | 'Stocks'
  | 'Bonds'
  | 'Alts'
  | 'Cash'
  | 'Real Estate';

export type CryptoAssetClassType = 'Crypto' | 'Stablecoin';

export type AssetClassType = StockAssetClassType | CryptoAssetClassType;

export interface NumberDisplayModel {
  val: number;
  display: string;
}

export interface ValueWeightModel {
  label: string;
  value: NumberDisplayModel;
  weight: NumberDisplayModel;
}

export interface PercChangeModel {
  class: string;
  perc: NumberDisplayModel;
}
