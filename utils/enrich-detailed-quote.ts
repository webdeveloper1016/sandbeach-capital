import _ from 'lodash';
import { currencyDisplay, percentDisplay, numberDisplay } from '../utils/calc';
import {
  AirTablePieModel,
  IexDetailedQuoteModel,
  IexBatchRequestDetailed,
  EnrichedDetailedQuoteModel,
} from '../ts';

export const enrichDetailedQuotes = (
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
):EnrichedDetailedQuoteModel => {
  const data = pies
    .map((slice) => {
      const iexData = _.get(quotes, [slice.symbol], null);
      if (!iexData) {
        return null;
      }

      const { quote, logo } = iexData as IexBatchRequestDetailed;
      return {
        symbol: slice.symbol,
        companyName: quote.companyName,
        shares: slice.shares,
        equity: currencyDisplay(quote.latestPrice * slice.shares),
        prices: {
          previousClose: currencyDisplay(quote.previousClose),
          open: currencyDisplay(quote.open),
          high: currencyDisplay(quote.high),
          low: currencyDisplay(quote.low),
          close: currencyDisplay(quote.close),
          latest: currencyDisplay(quote.latestPrice),
        },
        volume: {
          prev: numberDisplay(quote.previousVolume),
          current: numberDisplay(quote.volume),
        },
        change: currencyDisplay(quote.change),
        changePercent: percentDisplay(quote.changePercent, 1),
        equityPrevClose: currencyDisplay(quote.previousClose * slice.shares),
        logo: logo.url,
        stats: {
          marketCap: numberDisplay(quote.marketCap),
          peRatio: quote.peRatio,
          week52High: currencyDisplay(quote.week52High),
          week52Low: currencyDisplay(quote.week52Low),
          ytdChange: percentDisplay(quote.ytdChange, 1),
        },
      };
    })
    .filter((x) => x);

  // balance now
  const sumAccount = data.reduce(
    (accum, current) => accum + current.equity.val,
    0,
  );

  // balance at close yesterday
  const sumPrevClose = data.reduce(
    (accum, current) => accum + current.equityPrevClose.val,
    0,
  );

  const accountWithWeight = data.map((p) => ({
    ...p,
    weight: percentDisplay(p.equity.val, sumAccount),
  }));

  return {
    summary: {
      balance: currencyDisplay(sumAccount),
      prevBalance: currencyDisplay(sumPrevClose),
      dayChange: percentDisplay(sumAccount - sumPrevClose, sumAccount),
    },
    quotes: _.orderBy(accountWithWeight, ['equity.val'], ['desc']),
  };
};
