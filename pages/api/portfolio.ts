import jwt from 'jsonwebtoken';
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
  try {
    // check for jwt in header
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      // extract token from header
      const token = req.headers.authorization.split(' ')[1];

      // verify token
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err) => {
          if (err) {
            res.status(401).send(prod ? 'Unauthorized' : JSON.stringify(err));
            return;
          }
          // send response if no error
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data, iex }));
        },
      );
    } else {
      res.status(401).send('Unauthorized');
    }
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

export default handler;
