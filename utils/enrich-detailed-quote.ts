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
): EnrichedDetailedQuoteModel => {
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
        symbolCompany: {
          symbol: slice.symbol,
          name: quote.companyName,
        },
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
        changePercent: {
          class: quote.changePercent > 0 ? 'text-green-500' : 'text-red-500',
          perc: percentDisplay(quote.changePercent, 1, true),
        },
        equityPrevClose: currencyDisplay(quote.previousClose * slice.shares),
        logo: logo ? logo.url : null,
        tags: slice.tags ? slice.tags : [],
        sector: slice.sector,
        stats: {
          marketCap: numberDisplay(quote.marketCap),
          peRatio: quote.peRatio,
          week52High: currencyDisplay(quote.week52High),
          week52Low: currencyDisplay(quote.week52Low),
          week52Range: `${currencyDisplay(quote.week52Low).display} - ${
            currencyDisplay(quote.week52High).display
          }`,
          week52OffHighPercent:
            quote.latestPrice >= quote.week52High
              ? {
                  display: '0%',
                  val: 0,
                }
              : percentDisplay(
                  quote.week52High - quote.latestPrice,
                  quote.week52High,
                ),
          ytdChange: percentDisplay(quote.ytdChange, 1, true),
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

  const dayChangePerc = percentDisplay(
    sumAccount - sumPrevClose,
    sumAccount,
    true,
  );

  return {
    summary: {
      balance: currencyDisplay(sumAccount),
      prevBalance: currencyDisplay(sumPrevClose),
      dayChange: {
        class: dayChangePerc.val > 0 ? 'text-green-500' : 'text-red-500',
        perc: dayChangePerc,
      },
    },
    quotes: _.orderBy(accountWithWeight, ['equity.val'], ['desc']),
  };
};
