import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const auth = (req: NextApiRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
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
            reject({ ...err, status: 401 });
          }
          resolve();
        });
      } else {
        reject({ message: 'Invalid header', status: 401 });
      }
    } catch (error) {
      reject({ ...error, status: 401 });
    }
  });
};
