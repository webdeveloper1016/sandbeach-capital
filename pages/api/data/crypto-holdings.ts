import { currentMarketData } from './balances';
import {
  PieModel,
  AssetClassType,
  SectorStrategyType,
} from '../../../ts/types';

interface BasePieModel {
  targetPercent: number;
  assetClass: AssetClassType;
  sector: SectorStrategyType;
}

const base: BasePieModel = {
  assetClass: 'Crypto',
  sector: 'Crypto',
  targetPercent: 1,
};

export const cryptoHoldings: Record<string, PieModel[]> = {
  coinbase: [
    {
      ...base,
      nickname: 'BTC',
      marketData: [
        {
          ticker: 'BTC',
          shares: currentMarketData.cryptoCoinbase.btc,
          market: 'crypto',
        },
      ],
    },
  ],
  blockfi: [
    {
      ...base,
      nickname: 'BTC',
      marketData: [
        {
          ticker: 'BTC',
          shares: currentMarketData.cryptoBlockFi.btc,
          market: 'crypto',
        },
      ],
    },
  ],
  celsius: [
    {
      ...base,
      assetClass: 'Stablecoin',
      sector: 'Stablecoin',
      nickname: 'USDC',
      targetPercent: 0.95,
    },
    {
      ...base,
      nickname: 'ETH',
      targetPercent: 0.05,
      marketData: [
        {
          ticker: 'ETH',
          shares: currentMarketData.cryptoCelsius.eth,
          market: 'crypto',
        },
      ],
    },
    {
      ...base,
      nickname: 'SNX',
      targetPercent: 0.05,
    },
    {
      ...base,
      nickname: 'COMP',
      targetPercent: 0.05,
    },
  ],
};
