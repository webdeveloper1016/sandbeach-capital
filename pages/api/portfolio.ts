import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import {
  airtable,
  airtablePaged,
  auth,
  errResp,
  fetchStockHoldings,
  fetchCoincap,
} from '../../middleware';
import { enrichAccounts } from '../../utils/enrich-accounts';
import { enrichCrypto } from '../../utils/enrich-crypto';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexUrlModel,
  AirTableCryptoModel,
} from '../../ts';

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
    const accounts = await airtable<AirTableAccountModel[]>('Accounts');
    const crypto = await airtable<AirTableCryptoModel[]>('Crypto');
    const pies = await airtablePaged<AirTablePieModel>('Pies');

    // fetch quotes
    const quotes = await fetchStockHoldings(
      _.uniqBy(pies, 'symbol')
        .map((x) => x.symbol)
        .filter((x) => x),
      iex,
    );
    const cryptoQuotes = await fetchCoincap(
      _.uniqBy(crypto, 'coin').map((x) => x.coin),
    );

    res.status(200).json({
      data: enrichAccounts(
        accounts,
        pies,
        quotes,
        enrichCrypto(crypto, cryptoQuotes),
        iex,
      ),
    });
  } catch (error) {
    res.status(error.status || 500).end(errResp(prod, error, error.status));
  }
};

export default handler;
