import _ from 'lodash';
import { percentDisplay } from './calc';
import { formatDetailedQuote } from './iex';
import {
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexStockQuoteDetailedModelEnriched,
  AirTableAccountModel
} from '../ts';

// TODO: filter mutual funds
// TODO: add BTC
// TODO: add target perc field
// TODO: update ticker
export const enrichAllHoldings = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexSimpleQuoteModel,
  portfolioTotal: number,
): IexStockQuoteDetailedModelEnriched[] => {
  const holdings = Object.keys(quotes).map((symbol) => {
    const quote = quotes[symbol].api;
    const rollup = pies
      .filter((p) => p.symbol === symbol)
      .reduce(
        (accum, current) => ({
          ...accum,
          shares: accum.shares + current.shares,
          sector: `${current.assetClass} - ${current.sector}`,
          accounts: [...accum.accounts, accounts.find(f => f.id === current.account).nickname]
        }),
        {
          shares: 0,
          sector: '',
          accounts: []
        },
      );
    const detailedQuote = formatDetailedQuote(symbol, rollup.shares, quote);
    return {
      ...detailedQuote,
      logo: null,
      sector: rollup.sector,
      accounts: rollup.accounts,
      accountsJoined: rollup.accounts.join(', '),
      weight: percentDisplay(detailedQuote.equity.val, portfolioTotal),
    };
  });

  const ordered = _.orderBy(holdings, ['equity.val'], ['desc']);

  return ordered.map((o, k) => ({
    ...o,
    rank: k + 1,
  }));
};
