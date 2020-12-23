import data from '../../data';

const handler = (req, res) => {
  const token = process.env.SB_API_TOKEN;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // https://nextjs.org/docs/basic-features/environment-variables
  res.end(JSON.stringify({ data, token }));
};

export default handler;
