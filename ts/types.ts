export type CategoryType = 'short-term' | 'long-term' | 'retirement';

export type StockAssetClassType =
  | 'Equities'
  | 'Fixed Income'
  | 'Commodities'
  | 'Real Estate';

export type CashEquivalentsClassType = 'Cash' | 'Cash Equivalents';

export type CryptoAssetClassType = 'Crypto' | 'Stablecoin';

export type AssetClassType =
  | StockAssetClassType
  | CryptoAssetClassType
  | CashEquivalentsClassType;

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
