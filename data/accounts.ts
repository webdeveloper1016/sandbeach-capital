import { currentBalances } from './index';
import { PortfolioModel } from '../ts/types';

const data: PortfolioModel = {
  shortTerm: [
    {
      account: 'Emergency Fund',
      institution: 'Betterment',
      goal: 'Liquid emergency fund',
      timeHorizon: 'sub 3 years',
      category: 'short-term',
      approach: 'Robo',
      risk: 1,
      balance: currentBalances.stEmergency,
      pie: [
        {
          assetClass: 'Cash',
          subSector: 'Cash',
          nickname: 'Betterment cash',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'ST - Stock/Bond',
      institution: 'M1',
      goal: 'Liquid emergency fund backup',
      timeHorizon: 'next 5 years',
      category: 'short-term',
      approach: 'Self Directed',
      risk: 2,
      balance: currentBalances.stStockBond,
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic/Foreign mix stocks',
          nickname: 'Betterment general investing',
          targetPercent: 0.5,
        },
        {
          assetClass: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Betterment general investing',
          targetPercent: 0.5,
        },
      ],
    },
  ],
  longTerm: [
    {
      account: 'LT- Diversified Portfolio',
      institution: 'M1',
      goal: 'Liquid capital appriciation',
      timeHorizon: '5+ years',
      category: 'long-term',
      approach: 'Self Directed',
      risk: 3,
      balance: currentBalances.ltDiversified,
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Growth',
          nickname: 'Growth',
          targetPercent: 0.52,
        },
        {
          assetClass: 'Stocks',
          subSector: 'Income',
          nickname: 'Income',
          targetPercent: 0.27,
        },
        {
          assetClass: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Bonds',
          targetPercent: 0.11,
        },
        {
          assetClass: 'Alts',
          subSector: 'Alts mix',
          nickname: 'Alts',
          targetPercent: 0.10,
        },
      ],
    },
    {
      account: 'LT - Stocks',
      institution: 'M1',
      goal: 'Capital appriciation that outpreforms the S&P 500',
      timeHorizon: '5+ years',
      category: 'long-term',
      balance: currentBalances.ltStocks,
      risk: 5,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'My stock picks',
          targetPercent: 0.9,
        },
        {
          assetClass: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'My stock picks',
          targetPercent: 0.1,
        },
      ],
    },
    {
      account: 'Coinbase',
      institution: 'Coinbase',
      goal: 'Exposure to cryptocurrencies',
      timeHorizon: '5+ years',
      category: 'long-term',
      risk: 5,
      balance: currentBalances.cryptoCoinbase,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          subSector: 'Crypto',
          nickname: 'Coinbase',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'BlockFi',
      institution: 'BlockFi',
      goal: 'Exposure to cryptocurrencies while earning interest',
      timeHorizon: '5+ years',
      category: 'long-term',
      risk: 5,
      balance: currentBalances.cryptoBlockFi,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          subSector: 'BTC',
          nickname: 'BlockFi',
          targetPercent: 0.94,
        },
        {
          assetClass: 'Crypto',
          subSector: 'Stablecoin',
          nickname: 'BlockFi',
          targetPercent: 0.06,
        },
      ],
    },
  ],

  retirement: [
    {
      account: 'Jamie - Rollover',
      institution: 'Vanguard',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieRoll,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Tech stocks',
          nickname: 'QQQ',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Jamie - IRA',
      institution: 'Vanguard',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieIRA,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.6,
        },
        {
          assetClass: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan - Rollover',
      institution: 'M1 - TODO',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryanRoll,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'SP 500',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Bryan - 401(k)',
      institution: 'Merril Lynch',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryan401k,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.6,
        },
        {
          assetClass: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan - IRA',
      institution: 'M1',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryanIRA,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.53,
        },
        {
          assetClass: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.38,
        },
        {
          assetClass: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Bonds',
          targetPercent: 0.06,
        },
        {
          assetClass: 'Alts',
          subSector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.03,
        },
      ],
    },
  ],
};

export default data;
