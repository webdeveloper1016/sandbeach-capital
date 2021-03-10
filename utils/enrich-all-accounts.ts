import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexUrlModel,
} from '../ts';

export const enrichAllAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
  iex: IexUrlModel,
) => {
  return Object.keys(quotes).map((k) => {
    const quote = quotes[k].api;
    const shares = pies
      .filter((p) => p.symbol === k)
      .reduce((accum, current) => accum + current.shares, 0);
    return {
      symbol: k,
      companyName: quote.companyName,
      symbolCompany: {
        symbol: k,
        name: quote.companyName,
      },
      shares,
    };
  });
};
