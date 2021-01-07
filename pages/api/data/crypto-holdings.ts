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
    {
      ...base,
      nickname: 'ETH',
      marketData: [
        {
          ticker: 'ETH',
          shares: currentMarketData.cryptoCoinbase.eth,
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
      sector: 'Stablecoin',
      nickname: 'USDC',
      targetPercent: 0.95,
    },
    {
      ...base,
      nickname: 'COMP',
      targetPercent: 0.05,
    },
  ],
};
