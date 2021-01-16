import jwt from 'jsonwebtoken';
import data from './data';

const prod = process.env.NODE_ENV === 'production';

const iex = {
  env: process.env.IEX_API_URL.includes('sandbox') ? 'Sandbox' : 'Live',
  token: process.env.IEX_API_TOKEN,
  baseUrl: process.env.IEX_API_URL,
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
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          res.status(401).send(prod ? 'Unauthorized' : JSON.stringify(err));
          return;
        }
        // send response if no error
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data, iex }));
      });
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
