import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { fetchIEXBatch, auth, errResp } from '../../middleware';
import { IexUrlModel } from '../../ts';

const prod = process.env.NODE_ENV === 'production';

const iex: IexUrlModel = {
  env: process.env.IEX_API_URL.includes('sandbox') ? 'Sandbox' : 'Live',
  token: process.env.IEX_API_TOKEN,
  baseUrl: process.env.IEX_API_URL,
};

// TODO: add key stats --> https://iexcloud.io/docs/api/#key-stats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);

    // get symbols from body
    const symbols = req.body.symbols || [];

    // fetch from IEX
    const data = await fetchIEXBatch(symbols, iex);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
