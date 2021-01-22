import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { airtable, auth, errResp, fetchCoincap } from '../../middleware';
import { CoinCapAssetRespModel } from '../../ts/coincap';

const prod = process.env.NODE_ENV === 'production';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);

    // fetch from DB
    const holdings = await airtable('Crypto');
    // fetch prices
    const prices = await fetchCoincap([
      'bitcoin',
      'ethereum',
      'aave',
      'uniswap',
      'compound',
      'algorand',
      'synthetix-network-token',
      'cosmos',
      'yearn-finance',
      'maker',
      'tezos',
    ]);
    res.status(200).json({ data: { prices, holdings } });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

// export default authMiddleware(handler);
export default handler;
