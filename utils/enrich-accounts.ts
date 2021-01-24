import { currencyDisplay } from './calc';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
  EnrichedCryptoModel,
} from '../ts';

interface PieModel {
  [x: string]: any;
  sliceTotalValue: number;
}

export const enrichAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
  cryptoData: EnrichedCryptoModel,
) => {
  const data = accounts.map((account) => {
    let pie: PieModel[] = [];
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

  return {
    portfolioTotal: currencyDisplay(portfolioTotal),
    accounts: data,
  };
};
