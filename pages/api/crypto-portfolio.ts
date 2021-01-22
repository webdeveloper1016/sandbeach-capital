import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { airtable, auth, errResp } from '../../middleware';
import { CoinCapAssetRespModel } from '../../ts/coincap';

const prod = process.env.NODE_ENV === 'production';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);

    // fetch from DB
    const holdings = await airtable('Crypto');
    // fetch prices
    const { data: prices } = await axios.get<CoinCapAssetRespModel>(
      'https://api.coincap.io/v2/assets',
      {
        params: {
          ids: 'bitcoin,ethereum,aave',
        },
      },
    );
    res.status(200).json({ data: { prices, holdings } });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

// export default authMiddleware(handler);
export default handler;
