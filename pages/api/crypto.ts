import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { airtable, auth, errResp, fetchCoincap } from '../../middleware';
import { enrichCrypto } from '../../utils/enrich-crypto';
import { AirTableCryptoModel } from '../../ts';

const prod = process.env.NODE_ENV === 'production';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);

    // fetch from DB
    const holdings = await airtable<AirTableCryptoModel[]>('Crypto');

    // fetch prices
    const prices = await fetchCoincap(
      _.uniqBy(holdings, 'coin').map((x) => x.coin),
    );

    res.status(200).json({
      data: enrichCrypto(holdings, prices),
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
