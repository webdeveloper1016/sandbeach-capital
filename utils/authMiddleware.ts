import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiErr } from './apiErr';

const prod = process.env.NODE_ENV === 'production';

export const authMiddleware = (handler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // check for jwt in header
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // extract token from header
    const token = req.headers.authorization.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        return res
          .status(401)
          .send(prod ? 'Unauthorized' : JSON.stringify(err));
      }
      console.log('TOKEN OK2');
      // if valid pass the request along
      return await handler(req, res);
    });
  } else {
    return res.status(401).send('Unauthorized');
  }
};
