import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import {
  airtable,
  airtablePaged,
  auth,
  errResp,
  fetchStockHoldingsDetailed,
  fetchCoincap,
} from '../../middleware';
import { enrichAccounts } from '../../utils/enrich-accounts';
import { enrichDetailedQuotes } from '../../utils/enrich-detailed-quote';
import { enrichCrypto } from '../../utils/enrich-crypto';
import {
  AirTablePieModel,
  AirTableAccountModel,
  IexUrlModel,
  AirTableCryptoModel,
} from '../../ts';

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
    const accounts = await airtable<AirTableAccountModel[]>('Accounts');
    const crypto = await airtable<AirTableCryptoModel[]>('Crypto');
    const pies = await airtablePaged<AirTablePieModel>('Pies');
    // const pies = await airtable<AirTablePieModel[]>(
    //   'Pies',
    //   `{account} = '${account}'`,
    // );
    console.log(accounts);
    // robinhoodBuckets

    // fetch quotes
    const quotes = await fetchStockHoldingsDetailed(pies, iex);

    const cryptoQuotes = await fetchCoincap(
      _.uniqBy(crypto, 'coin').map((x) => x.coin),
    );

    const accountData = enrichAccounts(
      accounts,
      pies,
      quotes,
      enrichCrypto(crypto, cryptoQuotes),
      iex,
    );

    res.status(200).json({
      data: enrichDetailedQuotes(
        pies.filter((x) => x.account === account),
        quotes,
      ),
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
