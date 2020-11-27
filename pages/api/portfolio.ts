const data = [
  { category: 'short-term' },
  { category: 'long-term' },
  {
    category: 'retirement',
    sector: 'US Stocks',
    subSector: 'tech',
    style: 'ETF',
    ticker: 'QQQ',
    fees: 0.2,
    shares: 133,
    amount: 38000,
    yield: 0.55
  },
];

const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

export default handler;
