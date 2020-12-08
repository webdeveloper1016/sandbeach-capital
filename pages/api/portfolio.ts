import { PortfolioModel } from '../../types';

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
      balance: 13000,
      pie: [
        {
          sector: 'Cash',
          subSector: 'Cash',
          nickname: 'Betterment cash',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Short Term - Stock/Bond',
      institution: 'M1',
      goal: 'Liquid emergency fund backup',
      timeHorizon: 'next 5 years',
      category: 'short-term',
      approach: 'Robo',
      risk: 2,
      balance: 2000,
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic/Foreign mix stocks',
          nickname: 'Betterment general investing',
          targetPercent: 0.5,
        },
        {
          sector: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Betterment general investing',
          targetPercent: 0.5,
        },
      ],
    },
  ],
  longTerm: [
    {
      account: 'Long Term - Diversified Portfolio',
      institution: 'M1',
      goal: 'Liquid capital appriciation',
      timeHorizon: '5+ years',
      category: 'long-term',
      approach: 'Self Directed',
      risk: 3,
      balance: 295,
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Growth',
          nickname: 'Growth',
          targetPercent: 0.5,
        },
        {
          sector: 'Stocks',
          subSector: 'Income',
          nickname: 'Income',
          targetPercent: 0.2,
        },
        {
          sector: 'Stocks',
          subSector: 'Individual Stocks',
          nickname: 'Individual Stocks',
          targetPercent: 0.15,
        },
        {
          sector: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Bonds',
          targetPercent: 0.1,
        },
        {
          sector: 'Alts',
          subSector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.05,
        },
      ],
    },
    {
      account: 'Long Term - Stocks',
      institution: 'M1',
      goal: 'Capital appriciation that outpreforms the S&P 500',
      timeHorizon: '5+ years',
      category: 'long-term',
      balance: 0,
      risk: 5,
      approach: 'Self Directed',
      pie: [
        {
          sector: "Stocks",
          subSector: 'Hedge fund follow',
          nickname: 'Hedge Fund Follow',
          targetPercent: 0.9,
        },
        {
          sector: "Stocks",
          subSector: 'Domestic stocks',
          nickname: 'My stock picks',
          targetPercent: 0.1,
        },
      ],
    },
    {
      account: 'Titan',
      institution: 'Titan',
      goal: 'Capital appriciation that outpreforms the S&P 500',
      timeHorizon: '5+ years',
      category: 'long-term',
      balance: 500,
      risk: 5,
      approach: 'Robo',
      pie: [
        {
          sector: "Stocks",
          subSector: 'Hedge fund',
          nickname: 'Titan Flagship',
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
      balance: 500,
      approach: 'Self Directed',
      pie: [
        {
          sector: 'Crypto',
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
      balance: 2200,
      approach: 'Self Directed',
      pie: [
        {
          sector: 'Crypto',
          subSector: 'Crypto',
          nickname: 'BlockFi',
          targetPercent: 1.0,
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
      balance: 39000,
      approach: 'Self Directed',
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Tech stocks',
          nickname: 'QQQ',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Jamie IRA',
      institution: 'Vanguard',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      risk: 4,
      balance: 42000,
      approach: 'Self Directed',
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.6,
        },
        {
          sector: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan Rollover',
      institution: 'M1 - TODO',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: 30000,
      risk: 4,
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'SP 500',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Bryan 401(k)',
      institution: 'Merril Lynch',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: 2500,
      risk: 4,
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.6,
        },
        {
          sector: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan IRA',
      institution: 'M1',
      goal: 'Long term capital appritiation',
      timeHorizon: '25+ years',
      category: 'retirement',
      approach: 'Self Directed',
      balance: 1600,
      risk: 4,
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic stocks',
          nickname: 'domestic',
          targetPercent: 0.53,
        },
        {
          sector: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'foreign',
          targetPercent: 0.38,
        },
        {
          sector: 'Bonds',
          subSector: 'Domestic/Foreign mix bonds',
          nickname: 'Bonds',
          targetPercent: 0.06,
        },
        {
          sector: 'Alts',
          subSector: 'REIT',
          nickname: 'Alts',
          targetPercent: 0.03,
        },
      ],
    },
  ],
};

const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

export default handler;
