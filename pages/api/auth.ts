import jwt from 'jsonwebtoken';
import { errResp } from '../../middleware';

const prod = process.env.NODE_ENV === 'production';

const TOKEN_EXP = '1d';

interface ReqModel {
  method: 'POST' | 'GET';
  body: {
    secret: string;
  };
}

const handler = (req: ReqModel, res) => {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      // check for body
      if (!body.secret) {
        res.status(400).end(errResp(prod, 'Bad Request', 400));
        return;
      }

      // validate token
      if (body.secret !== process.env.APP_SECRET) {
        res.status(401).end(errResp(prod, 'Unauthorized', 401));
        return;
      }

      // gen token and send it back
      const token = jwt.sign(
        {
          data: null,
        },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_EXP },
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(error.status || 500).end(errResp(prod, error, 500));
    }
  } else {
    // Handle any other HTTP method
    res.status(405).end(errResp(prod, 'Method Not Allowed', 405));
  }
};

export default handler;
