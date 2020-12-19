import { currentBalances } from './balances';
import { PortfolioAccountModel } from '../ts/types';

const accounts: PortfolioAccountModel = {
  shortTerm: [
    {
      account: 'Cash',
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
          sector: 'Cash',
          nickname: 'Betterment Cash',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'M1 - Emergency',
      institution: 'M1',
      goal: 'Liquid, conservative emergency fund backup',
      timeHorizon: 'next 5 years',
      category: 'short-term',
      approach: 'Self Directed',
      risk: 2,
      balance: currentBalances.stStockBond,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'VYM',
          targetPercent: 0.25,
        },
        {
          assetClass: 'Stocks',
          sector: 'Foreign Stocks',
          nickname: 'IDV',
          targetPercent: 0.25,
        },
        {
          assetClass: 'Bonds',
          sector: 'US Bonds',
          nickname: 'BND',
          targetPercent: 0.25,
        },
        {
          assetClass: 'Bonds',
          sector: 'Foreign Bonds',
          nickname: 'BNDX',
          targetPercent: 0.25,
        },
      ],
    },
  ],
  longTerm: [
    {
      account: 'M1 - Balanced',
      institution: 'M1',
      goal: 'Liquid capital appriciation',
      timeHorizon: '5+ years',
      category: 'long-term',
      approach: 'Self Directed',
      risk: 3,
      active: true,
      balance: currentBalances.ltDiversified,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Growth',
          nickname: 'Growth',
          targetPercent: 0.58,
        },
        {
          assetClass: 'Stocks',
          sector: 'Value',
          nickname: 'Value',
          targetPercent: 0.42,
        },
      ],
    },
    {
      account: 'M1 - Stocks',
      institution: 'M1',
      goal: 'High risk/high reward individual stock picks',
      timeHorizon: '5+ years',
      category: 'long-term',
      balance: currentBalances.ltStocks,
      risk: 5,
      active: true,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Individual Stocks',
          nickname: 'Stock Picks',
          targetPercent: 1.0,
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
          sector: 'Crypto',
          nickname: 'Bitcoin',
          targetPercent: 0.88,
        },
        {
          assetClass: 'Crypto',
          sector: 'Crypto',
          nickname: 'Misc Coins',
          targetPercent: 0.12,
        },
      ],
    },
    {
      account: 'BlockFi',
      institution: 'BlockFi',
      goal: 'Crypto account with interest',
      timeHorizon: '5+ years',
      category: 'long-term',
      risk: 5,
      balance: currentBalances.cryptoBlockFi,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          sector: 'Crypto',
          nickname: 'Bitcoin',
          targetPercent: 0.94,
        },
        {
          assetClass: 'Crypto',
          sector: 'Stablecoin',
          nickname: 'Stablecoins',
          targetPercent: 0.06,
        },
      ],
    },
  ],
  retirement: [
    {
      account: 'Jamie - Rollover',
      institution: 'Vanguard',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieRoll,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Tech Stocks',
          nickname: 'Tech Stocks',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Jamie - IRA',
      institution: 'Vanguard',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieIRA,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'US Stocks',
          targetPercent: 0.6,
        },
        {
          assetClass: 'Stocks',
          sector: 'Foreign Stocks',
          nickname: 'Foreign Stocks',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan - Rollover',
      institution: 'M1 - TODO',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryanRoll,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'US Stocks',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Bryan - 401(k)',
      institution: 'Merril Lynch',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryan401k,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'US Stocks',
          targetPercent: 0.6,
        },
        {
          assetClass: 'Stocks',
          sector: 'Foreign Stocks',
          nickname: 'Foreign Stocks',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan - IRA',
      institution: 'M1',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryanIRA,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'US Stocks',
          targetPercent: 0.46,
        },
        {
          assetClass: 'Stocks',
          sector: 'Foreign Stocks',
          nickname: 'Foreign Stocks',
          targetPercent: 0.46,
        },
        {
          assetClass: 'Bonds',
          sector: 'Global Bond Mix',
          nickname: 'Bonds',
          targetPercent: 0.05,
        },
        {
          assetClass: 'Alts',
          sector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.03,
        },
      ],
    },
  ],
};

export default accounts;
