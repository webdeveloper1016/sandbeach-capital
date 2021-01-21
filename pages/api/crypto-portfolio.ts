import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'
import Airtable from 'airtable';
import { authMiddleware } from '../../utils/authMiddleware';
import { apiErr } from '../../utils/apiErr';

const prod = process.env.NODE_ENV === 'production';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE,
);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    base('Crypto')
      .select({
        view: 'Grid view',
      })
      .firstPage(async (err, records) => {
        // check for err
        if (err) {
          res.status(500).send(apiErr(prod, new Error(err)));
          return;
        }
        // fetch prices
        const {data: prices} = await axios.get('https://api.coincap.io/v2/assets', {
          params: {
            ids: 'bitcoin,ethereum,aave'
          }
        })
        // process data
        const holdings = records.map((r) => r.fields);

        // send response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: {prices, holdings} }));
      });
  } catch (error) {
    res.status(500).send(apiErr(prod, error));
  }
};

export default authMiddleware(handler);
