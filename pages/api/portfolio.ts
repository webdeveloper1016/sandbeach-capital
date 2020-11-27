import { PortfolioModel } from '../../types';

const data: PortfolioModel[] = [
  { category: 'short-term', sector: 'Cash', amount: 13000 },
  {
    category: 'short-term',
    sector: 'Robo',
    amount: 2000,
    pie: [
      { slice: 'US stock', percentage: 0.5 },
      { slice: 'Us Govt bond', percentage: 0.5 },
    ],
  },
  {
    category: 'long-term',
    sector: 'M1',
    amount: 20,
    pie: [{ slice: 'Hedge fund follow', percentage: 0.1 }],
  },
  {
    category: 'retirement',
    sector: 'US Stock',
    subSector: 'Tech stock',
    // style: 'ETF',
    // ticker: 'QQQ',
    // fees: 0.2,
    // shares: 133,
    amount: 38000,
    // yield: 0.55,
  },
];

const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

export default handler;
