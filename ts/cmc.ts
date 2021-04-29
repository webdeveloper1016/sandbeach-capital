import { NumberDisplayModel, PercChangeModel } from './types';
import { AirTableCryptoModelExtended, AirTableConfigModelExtended } from './airtable';

export interface CMCAssetQuoteModel {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  last_updated: string;
}

export interface CMCAssetModel {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: string;
  quote: Record<'USD', CMCAssetQuoteModel>;
}

export interface CoinMarketCapRespModel {
  status: Record<string, any>;
  data: Record<string, CMCAssetModel>;
}

export interface CoinMarketCapAssetModel extends CMCAssetModel {
  symbolName: {
    symbol: string;
    name: string;
    urls: {
      coincap: string;
      messari: string;
      cmc: string;
    };
  };
  rank: string;
  priceDisplay: NumberDisplayModel;
  marketCapDisplay: NumberDisplayModel;
  volumeDisplay: NumberDisplayModel;
  changePercent: PercChangeModel;
  changePercentWeek: PercChangeModel;
  changePercentMo: PercChangeModel;
  changePercentThreeMo: PercChangeModel;
  supplyDisplay: NumberDisplayModel;
}



export interface CoinMarketCapAssetModelExteded extends CoinMarketCapAssetModel {
  stablecoin: boolean;
  weight: NumberDisplayModel;
  weightExStable: NumberDisplayModel;
  accountTags: string[];
  totalAmount: NumberDisplayModel;
  totalValue: NumberDisplayModel;
  assetClass: string;
  targetPercent?: number;
}

export interface CMCEnrichedCryptoModel {
  coins: CoinMarketCapAssetModelExteded[];
  coinsWithAmount: CoinMarketCapAssetModelExteded[];
  portfolioTotal: NumberDisplayModel;
  portfolioTotalExStable: NumberDisplayModel;
  holdingsByAccount: AirTableCryptoModelExtended[];
  config: AirTableConfigModelExtended;
}
