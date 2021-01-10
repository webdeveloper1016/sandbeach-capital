import jwt from 'jsonwebtoken';

const prod = process.env.NODE_ENV === 'production';

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
        res.status(400).send('Bad Request');
        return;
      }

      // validate token
      if (body.secret !== process.env.APP_SECRET) {
        res.status(401).send('Unauthorized');
        return;
      }

      // gen token and send it back
      const token = jwt.sign(
        {
          data: null,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ token }));
    } catch (error) {
      res.status(500).send(
        prod
          ? 'Server Error'
          : JSON.stringify({
              status: 'Server Error',
              message: error.message,
            }),
      );
    }
  } else {
    // Handle any other HTTP method
    res.status(405).send('Unsupported Method!');
  }
};

export default handler;
