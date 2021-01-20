import { NextApiRequest, NextApiResponse } from 'next'
import { cryptoHoldingsDirect } from './data/crypto-holdings';
import { authMiddleware } from '../../utils/authMiddleware';

const prod = process.env.NODE_ENV === 'production';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(cryptoHoldingsDirect));
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
