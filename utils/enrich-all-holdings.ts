import _ from 'lodash';
import {
  currencyDisplay,
  percentDisplay,
  numberDisplay,
  percDisplayWithClass,
} from './calc';
import { formatDetailedQuote } from './iex';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexUrlModel,
} from '../ts';

export const enrichAllHoldings = (
  // accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
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
