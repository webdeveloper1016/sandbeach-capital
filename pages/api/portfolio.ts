import data from './data';

const prod = process.env.NODE_ENV === 'production';

// https://nextjs.org/docs/basic-features/environment-variables
const iex = {
  env: prod ? 'Live' : 'Sandbox',
  token: prod ? process.env.API_TOKEN : process.env.SB_API_TOKEN,
  baseUrl: prod
    ? 'https://cloud.iexapis.com/stable'
    : 'https://sandbox.iexapis.com/stable',
};

const handler = (req, res) => {
  let other = null
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    other = req.headers.authorization.split(' ')[1];
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data, iex, other }));
};

export default handler;
