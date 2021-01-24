import { currencyDisplay } from './calc';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
} from '../ts';

export const enrichAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
) => {
  const data = accounts.map((a) => {
    const findPie = pies.filter((p) => p.account === a.id);
    const pie = findPie.map((slice) => {
      const quote = quotes[slice.symbol] || null;
      return {
        ...slice,
        sliceTotalValue: quote ? quote.price.val * slice.shares : slice.shares,
      };
    });
    return {
      ...a,
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

  return {
    portfolioTotal: currencyDisplay(portfolioTotal),
    accounts: data,
    meta: { accounts, pies, quotes },
  };
};
