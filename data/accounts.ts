import {
  currentBalances,
  currentContributions,
  currentMarketData,
} from './balances';
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
      biWeeklySavings: currentContributions.stEmergency,
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
      biWeeklySavings: currentContributions.stStockBond,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Income',
          nickname: 'SCHD',
          targetPercent: 0.25,
        },
        {
          assetClass: 'Stocks',
          sector: 'Intl',
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
      account: 'M1 - ETFs',
      institution: 'M1',
      goal: 'Liquid capital appriciation',
      timeHorizon: '5+ years',
      category: 'long-term',
      approach: 'Self Directed',
      risk: 3,
      active: true,
      balance: currentBalances.ltDiversified,
      biWeeklySavings: currentContributions.ltDiversified,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Growth',
          nickname: 'Growth',
          targetPercent: 0.6,
          sliceDetails: {
            active: 0.25,
            tech: 0.25,
            speculative: 0.25,
          }
        },
        {
          assetClass: 'Stocks',
          sector: 'Income',
          nickname: 'Income',
          targetPercent: 0.4,
          sliceDetails: {
            intl: 0.25,
          }
        },
      ],
    },
    {
      account: 'M1 - Stocks',
      institution: 'M1',
      goal: 'High risk/high reward individual stock picks',
      timeHorizon: '5+ years',
      category: 'long-term',
      risk: 5,
      active: true,
      approach: 'Self Directed',
      balance: currentBalances.ltStocks,
      biWeeklySavings: currentContributions.ltStocks,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Growth',
          nickname: 'Growth',
          targetPercent: 0.6,
          sliceDetails: {
            active: 1,
            speculative: 1,
          }
        },
        {
          assetClass: 'Stocks',
          sector: 'Income',
          nickname: 'Income',
          targetPercent: 0.4,
          sliceDetails: {
            active: 1,
          }
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
      biWeeklySavings: currentContributions.cryptoCoinbase,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          sector: 'Crypto',
          nickname: 'Bitcoin',
          targetPercent: 0.88,
          marketData: {
            ticker: 'BTC',
            shares: currentMarketData.cryptoCoinbase.btc,
            market: 'crypto',
          },
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
      biWeeklySavings: currentContributions.cryptoBlockFi,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          sector: 'Crypto',
          nickname: 'Bitcoin',
          targetPercent: 0.94,
          marketData: {
            ticker: 'BTC',
            shares: currentMarketData.cryptoBlockFi.btc,
            market: 'crypto',
          },
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
      account: 'Jamie - Traditional IRA',
      institution: 'Vanguard',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieRoll,
      biWeeklySavings: currentContributions.rJamieRoll,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Tech',
          nickname: 'QQQ',
          targetPercent: 1.0,
          marketData: {
            ticker: 'QQQ',
            shares: currentMarketData.rJamieRoll.qqq,
            market: 'stock',
          },
        },
      ],
    },
    {
      account: 'Jamie - Roth IRA',
      institution: 'Vanguard',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: currentBalances.rJamieIRA,
      biWeeklySavings: currentContributions.rJamieIRA,
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
          sector: 'Intl',
          nickname: 'Foreign Stocks',
          targetPercent: 0.4,
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
      preTax: true,
      balance: currentBalances.rBryan401k,
      biWeeklySavings: currentContributions.rBryan401k,
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
          sector: 'Intl',
          nickname: 'Foreign Stocks',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan - Roth IRA',
      institution: 'M1',
      goal: 'Long term capital appreciation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: currentBalances.rBryanIRA,
      biWeeklySavings: currentContributions.rBryanIRA,
      risk: 4,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Growth',
          nickname: 'US Stocks',
          targetPercent: 0.5,
          sliceDetails: {
            active: 0.4,
            speculative: 0.3,
          }
        },
        {
          assetClass: 'Stocks',
          sector: 'Intl',
          nickname: 'Foreign Stocks',
          targetPercent: 0.46,
        },
        {
          assetClass: 'Bonds',
          sector: 'Global Bond Mix',
          nickname: 'Bonds',
          targetPercent: 0.02,
        },
        {
          assetClass: 'Alts',
          sector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.02,
        },
      ],
    },
  ],
};

export default accounts;
