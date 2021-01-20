import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const prod = process.env.NODE_ENV === 'production';

export const authMiddleware = (handler) => (
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
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(401).send(prod ? 'Unauthorized' : JSON.stringify(err));
        return;
      }
      // if valid pass the request along
      return handler(req, res);
    });
  } else {
    res.status(401).send('Unauthorized');
    return;
  }
};
