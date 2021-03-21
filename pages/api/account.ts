import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { auth, errResp, airtableAll, fetchPortfolio } from '../../middleware';
import { enrichDetailedQuotes } from '../../utils/enrich-detailed-quote';
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

    const account = req.query.account as string;

    if (!account) {
      res.status(400).end(errResp(prod, 'Must include account param', 400));
      return;
    }

    // fetch from DB
    const airtable = await airtableAll();

    // fetch quotes and format
    const { allAccountData, quotes } = await fetchPortfolio(airtable, iex);

    res.status(200).json({
      data: enrichDetailedQuotes(
        airtable.pies.filter((x) => x.account === account),
        quotes,
        allAccountData,
        account,
      ),
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
