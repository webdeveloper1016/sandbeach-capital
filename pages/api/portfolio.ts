import { NextApiRequest, NextApiResponse } from 'next';
import { auth, errResp } from '../../middleware';
import data from './data';

const prod = process.env.NODE_ENV === 'production';

const iex = {
  env: process.env.IEX_API_URL.includes('sandbox') ? 'Sandbox' : 'Live',
  token: process.env.IEX_API_TOKEN,
  baseUrl: process.env.IEX_API_URL,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);
    res.status(200).json({ data, iex });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
