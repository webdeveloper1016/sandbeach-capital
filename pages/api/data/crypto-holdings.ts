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

export const cryptoHoldingsDirect = {
  
}

export const cryptoHoldings: Record<string, PieModel[]> = {
  coinbase: [
    {
      ...base,
      nickname: 'BTC',
      marketData: [
        {
          ticker: 'BTC',
          shares: [
            0.03585229, // cb
            0.00871754, // cb pro
          ].reduce((a, b) => a + b, 0),
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
          shares: 0.18386188,
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
          shares: 0.22407,
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
    {
      ...base,
      nickname: 'UNI',
      targetPercent: 0.05,
    },
  ],
};
