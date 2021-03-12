import _ from 'lodash';
import {
  currencyDisplay,
  percentDisplay,
  numberDisplay,
  percDisplayWithClass,
} from '../utils/calc';
import { formatDetailedQuote } from '../utils/iex';
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
  const holdings = Object.keys(quotes).map((symbol) => {
    const quote = quotes[symbol].api;
    const shares = pies
      .filter((p) => p.symbol === symbol)
      .reduce((accum, current) => accum + current.shares, 0);
    return { ...formatDetailedQuote(symbol, shares, quote) };
  });

  return _.orderBy(holdings, ['equity.val'], ['desc']);
};
