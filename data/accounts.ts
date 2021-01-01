import { currentBalances, currentMarketData } from './balances';
import { currentContributions } from './contributions';
import { PortfolioAccountModel } from '../ts/types';

const accounts: PortfolioAccountModel = {
  shortTerm: [
    {
      account: 'Cash',
      institution: 'M1',
      goal: 'Liquid checking account',
      timeHorizon: 'sub 1 year',
      category: 'short-term',
      approach: 'Other',
      risk: 1,
      balance: currentBalances.stCash,
      biWeeklySavings: currentContributions.stCash,
      pie: [
        {
          assetClass: 'Cash',
          sector: 'Cash',
          nickname: 'M1 Checking',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Savings',
      institution: 'Betterment',
      goal: 'Liquid emergency fund',
      timeHorizon: 'sub 3 years',
      category: 'short-term',
      approach: 'Robo',
      risk: 1,
      balance: currentBalances.stSavings,
      biWeeklySavings: currentContributions.stSavings,
      pie: [
        {
          assetClass: 'Cash',
          sector: 'Cash',
          nickname: 'Savings',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Emergency',
      institution: 'M1',
      goal: 'Liquid, conservative emergency fund backup',
      timeHorizon: 'next 5 years',
      category: 'short-term',
      approach: 'Self Directed',
      risk: 3,
      balance: currentBalances.stEmergency,
      biWeeklySavings: currentContributions.stEmergency,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Income',
          nickname: 'SCHD',
          targetPercent: 0.25,
          sliceDetails: {
            income: 1,
          },
        },
        {
          assetClass: 'Stocks',
          sector: 'Intl',
          nickname: 'IDV',
          targetPercent: 0.25,
          sliceDetails: {
            income: 1,
            intl: 1,
          },
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
    {
      account: 'Stablecoin',
      institution: 'BlockFi',
      goal: 'Crypto account with interest',
      timeHorizon: '5+ years',
      category: 'short-term',
      risk: 2,
      balance: currentBalances.stStablecoins,
      biWeeklySavings: currentContributions.stStablecoins,
      approach: 'Self Directed',
      pie: [
        {
          assetClass: 'Crypto',
          sector: 'Stablecoin',
          nickname: 'Stablecoins',
          targetPercent: 1,
        },
      ],
    },
  ],
  longTerm: [
    {
      account: 'M1',
      institution: 'M1',
      goal: 'Liquid capital appriciation',
      timeHorizon: '5+ years',
      category: 'long-term',
      approach: 'Self Directed',
      risk: 4,
      active: true,
      balance: currentBalances.ltM1.reduce((a, b) => a + b, 0),
      biWeeklySavings: currentContributions.ltM1,
      pie: [
        {
          assetClass: 'Stocks',
          sector: 'Growth',
          nickname: 'ETFs',
          targetPercent: 0.5,
          balance: currentBalances.ltM1[0],
          sliceDetails: {
            active: 0.6 * 0.35, // arkkk
            speculative: 0.6 * 0.35, // arkk
            momentum: 0.6 * 0.3,
            smallcap: 0.6 * 0.35,
            intl: 0.4 * 0.25,
            income: 0.4 * 1,
          },
        },
        {
          assetClass: 'Stocks',
          sector: 'US Stocks',
          nickname: 'Stocks',
          targetPercent: 0.5,
          balance: currentBalances.ltM1[1],
          sliceDetails: {
            active: 1,
            speculative: 0.6,
            quality: 0.14,
            income: 0.14,
            value: 0.12,
          },
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
          marketData: [
            {
              ticker: 'BTC',
              shares: currentMarketData.cryptoCoinbase.btc,
              market: 'crypto',
            },
            {
              ticker: 'ETH',
              shares: currentMarketData.cryptoCoinbase.btc,
              market: 'crypto',
            },
          ],
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
          targetPercent: 1,
          marketData: [
            {
              ticker: 'BTC',
              shares: currentMarketData.cryptoBlockFi.btc,
              market: 'crypto',
            },
          ],
        },
        {
          assetClass: 'Crypto',
          sector: 'Stablecoin',
          nickname: 'USDC',
          targetPercent: 0,
        },
      ],
    },
  ],
  retirement: [
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
          targetPercent: 0.6,
          sliceDetails: {
            esg: 0.05,
            smallcap: 0.15,
            momentum: 0.15,
            quality: 0.15 + 0.2 * 0.2, // 20% of All Stocks
            income: 0.1 + 0.15 * 0.2, // 15% of All Stocks
            active: 0.4,
            speculative: 0.3, // all of thematic ETFs, half of All Stocks
            value: 0.15 * 0.2, // 15% of All Stocks
          },
        },
        {
          assetClass: 'Stocks',
          sector: 'Intl',
          nickname: 'Foreign Stocks',
          targetPercent: 0.38,
          sliceDetails: {
            intl: 1,
            momentum: 0.1,
            income: 0.3,
          },
        },
        {
          assetClass: 'Bonds',
          sector: 'Global Bond Mix',
          nickname: 'Bonds',
          targetPercent: 0.01,
        },
        {
          assetClass: 'Alts',
          sector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.01,
        },
      ],
    },
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
          marketData: [
            {
              ticker: 'QQQ',
              shares: currentMarketData.rJamieRoll.qqq,
              market: 'stock',
            },
          ],
          sliceDetails: {
            tech: 1,
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
          nickname: 'VT',
          targetPercent: 1,
          sliceDetails: {
            intl: 0.4,
          },
          marketData: [
            {
              ticker: 'VT',
              shares: currentMarketData.rJamieIRA.vt,
              market: 'stock',
            },
            {
              ticker: 'VTWAX',
              shares: currentMarketData.rJamieIRA.vtwax,
              market: 'stock',
            },
          ],
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
          targetPercent: 0.64,
          sliceDetails: {
            smallcap: 0.15,
          },
        },
        {
          assetClass: 'Stocks',
          sector: 'Intl',
          nickname: 'Foreign Stocks',
          targetPercent: 0.36,
          sliceDetails: {
            intl: 1,
          },
        },
      ],
    },
  ],
};

export default accounts;
