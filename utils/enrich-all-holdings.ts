import _ from 'lodash';
import { percentDisplay } from './calc';
import { formatDetailedQuote } from './iex';
import {
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexStockQuoteDetailedModelEnriched,
} from '../ts';

export const enrichAllHoldings = (
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
  portfolioTotal: number,
): IexStockQuoteDetailedModelEnriched[] => {
  const holdings = Object.keys(quotes).map((symbol) => {
    const quote = quotes[symbol].api;
    const shares = pies
      .filter((p) => p.symbol === symbol)
      .reduce((accum, current) => accum + current.shares, 0);
    const detailedQuote = formatDetailedQuote(symbol, shares, quote);
    return {
      ...detailedQuote,
      logo: null,
      weight: percentDisplay(detailedQuote.equity.val, portfolioTotal),
    };
  });

  return _.orderBy(holdings, ['equity.val'], ['desc']);
};
