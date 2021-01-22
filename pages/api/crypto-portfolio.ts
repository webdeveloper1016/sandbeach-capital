import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { airtable } from '../../middleware/airtable';
import { authMiddleware } from '../../utils/authMiddleware';
import { apiErr } from '../../utils/apiErr';
import { CoinCapAssetRespModel } from '../../ts/coincap';

const prod = process.env.NODE_ENV === 'production';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const holdings = await airtable('Crypto');
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
    res.status(500).end(apiErr(prod, error));
  }
};

// export default authMiddleware(handler);
export default handler;
