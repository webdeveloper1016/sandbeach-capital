import {
  AirTableAccountModel, AirTablePieModel, 
  IexSimpleQuoteModel,
} from '../ts';

export const enrichAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
) => {
  const data = accounts.map((a) => {
    const findPie = pies.filter((p) => p.account === a.id)
    const pie = findPie.map(p => {
      return {
        ...p,
        quote: quotes[p.symbol]
      }
    })
    return {
      ...a,
      pie,
    };
  });

  // console.log(prices)

  return { data, meta: {accounts, pies, quotes} };
};
