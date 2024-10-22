import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { airtableAll, auth, errResp, fetchPortfolio } from '../../middleware';
import { IexUrlModel } from '../../ts';

const prod = process.env.NODE_ENV === 'production';

const iex: IexUrlModel = {
  env: process.env.IEX_API_URL.includes('sandbox') ? 'Sandbox' : 'Live',
  token: process.env.IEX_API_TOKEN,
  baseUrl: process.env.IEX_API_URL,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check auth before proceeding
    await auth(req);

    // fetch from DB
    const airtable = await airtableAll();

    // fetch quotes and format
    const { allAccountData, quotes, cryptoQuotes, airtableConfig } = await fetchPortfolio(
      airtable,
      iex,
    );

    res.status(200).json({
      data: {
        ...allAccountData,
        config: airtableConfig,
        supportingData: {
          quotes,
          airtable,
          cryptoQuotes,
        },
      },
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
