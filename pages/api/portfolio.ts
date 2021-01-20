import { NextApiRequest, NextApiResponse } from 'next'
import data from './data';
import { authMiddleware } from '../../utils/authMiddleware';

const prod = process.env.NODE_ENV === 'production';

const iex = {
  env: process.env.IEX_API_URL.includes('sandbox') ? 'Sandbox' : 'Live',
  token: process.env.IEX_API_TOKEN,
  baseUrl: process.env.IEX_API_URL,
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data, iex }));
  } catch (error) {
    console.error(error);
    res.status(500).send(
      prod
        ? 'Server Error'
        : JSON.stringify({
            status: 'Server Error',
            message: error.message,
          }),
    );
  }
};

export default authMiddleware(handler);
