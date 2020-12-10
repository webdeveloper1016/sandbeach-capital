import data from '../../data/accounts';

const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

export default handler;
