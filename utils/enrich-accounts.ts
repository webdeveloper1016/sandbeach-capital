import { enrichSummary } from './enrich-summary';
import { enrichStats } from './enrich-stats';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
  EnrichedCryptoModel,
  APIAccountModel,
  IexUrlModel,
} from '../ts';

export const enrichAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
  cryptoData: EnrichedCryptoModel,
  iex: IexUrlModel,
): APIAccountModel => {
  const data = accounts.map((account) => {
    let pie = [];
    // enrich account with crypto or stock data
    if (account.crypto) {
      // crypto data already has prices and rolled up values
      pie = cryptoData.holdingsByAccount.filter(
        (p) => p.account === account.id,
      );
    } else {
      // filter pies by account and calc value with iex data
      const findPie = pies.filter((p) => p.account === account.id);
      pie = findPie.map((slice) => {
        const quote = quotes[slice.symbol] || null;
        return {
          ...slice,
          sliceTotalValue: quote
            ? quote.price.val * slice.shares
            : slice.shares,
        };
      });
    }

    return {
      ...account,
      pie,
      totalValue: pie.reduce(
        (accum, current) => accum + current.sliceTotalValue,
        0,
      ),
    };
  });

  const portfolioTotal = data.reduce(
    (accum, current) => accum + current.totalValue,
    0,
  );

  const exCryptoPortfolioTotal = data
    .filter((a) => !a.crypto)
    .reduce((accum, current) => accum + current.totalValue, 0);
  console.log(iex);
  return {
    summary: enrichSummary(portfolioTotal, exCryptoPortfolioTotal, cryptoData),
    stats: enrichStats(data, portfolioTotal),
    accounts: data,
    iex,
  };
};
