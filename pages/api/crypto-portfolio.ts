import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Airtable from 'airtable';
import { authMiddleware } from '../../utils/authMiddleware';
import { apiErr } from '../../utils/apiErr';
import { CoinCapAssetRespModel } from '../../ts/coincap';

const prod = process.env.NODE_ENV === 'production';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('right here!');
  return new Promise<void>((resolve, reject) => {
    try {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
        process.env.AIRTABLE_BASE,
      );

      base('Crypto')
        .select({
          view: 'Grid view',
        })
        .firstPage(async (err, records) => {
          // check for err
          if (err) {
            console.log('HERE');
            res.status(500).send(apiErr(prod, new Error(err)));
            return;
          }
          // fetch prices
          const { data: prices } = await axios.get<CoinCapAssetRespModel>(
            'https://api.coincap.io/v2/assets',
            {
              params: {
                ids: 'bitcoin,ethereum,aave',
              },
            },
          );
          // process data
          const holdings = records.map((r) => r.fields);

          console.log('down here');
          // send response
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data: { prices, holdings } }));
          resolve();
        });
    } catch (error) {
      res.json(apiErr(prod, error));
      res.status(500).end();
      resolve();
    }
  });
};

export default authMiddleware(handler);
// export default handler;
