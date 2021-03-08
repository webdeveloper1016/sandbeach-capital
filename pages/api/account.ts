import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import {
  airtable,
  auth,
  errResp,
  fetchStockHoldingsDetailed,
} from '../../middleware';
import { enrichDetailedQuotes } from '../../utils/enrich-detailed-quote';
import { AirTablePieModel, IexUrlModel } from '../../ts';

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

    const account = req.query.account;

    if (!account) {
      res.status(400).end(errResp(prod, 'Must include account param', 400));
      return;
    }

    // fetch from DB
    const pies = await airtable<AirTablePieModel[]>(
      'Pies',
      `{account} = '${account}'`,
    );

    // fetch quotes
    const quotes = await fetchStockHoldingsDetailed(
      _.uniqBy(pies, 'symbol')
        .map((x) => x.symbol)
        .filter((x) => x),
      iex,
    );

    res.status(200).json({
      data: enrichDetailedQuotes(pies, quotes),
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
