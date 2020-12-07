import { PortfolioModel } from '../../types';

const data: PortfolioModel = {
  shortTerm: [
    {
      account: 'Betterment',
      category: 'short-term',
      approach: 'Robo',
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
      account: 'Betterment',
      category: 'short-term',
      approach: 'Robo',
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
      account: 'M1',
      category: 'long-term',
      approach: 'Self Directed',
      balance: 200,
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
      account: 'Titan',
      category: 'long-term',
      balance: 350,
      approach: 'Robo',
      pie: [
        {
          sector: "Alts",
          subSector: 'Hedge fund',
          nickname: 'Titan Flagship',
          targetPercent: 1.0,
        },
      ],
    },
    {
      account: 'Coinbase',
      category: 'long-term',
      balance: 2500,
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
      category: 'long-term',
      balance: 100,
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
      category: 'retirement',
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
      category: 'retirement',
      balance: 42000,
      approach: 'Robo',
      pie: [
        {
          sector: 'Stocks',
          subSector: 'Domestic/Foreign mix stocks',
          nickname: 'VTI',
          targetPercent: 0.6,
        },
        {
          sector: 'Stocks',
          subSector: 'Foreign stocks',
          nickname: 'VXUS',
          targetPercent: 0.4,
        },
      ],
    },
    {
      account: 'Bryan Rollover',
      category: 'retirement',
      approach: 'Self Directed',
      balance: 30000,
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
      category: 'retirement',
      approach: 'Self Directed',
      balance: 2500,
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
      account: 'bryan IRA',
      category: 'retirement',
      approach: 'Self Directed',
      balance: 1600,
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
