import _ from 'lodash';
import { currencyDisplay, percentDisplay, numberDisplay } from '../utils/calc';
import {
  AirTablePieModel,
  IexDetailedQuoteModel,
  IexBatchRequestDetailed,
} from '../ts';

const iexQuoteKeys = [
  'companyName',
  'open',
  'high',
  'low',
  'close',
  'latestPrice',
  'latestUpdate',
  'previousClose',
  'previousVolume',
  'change',
  'changePercent',
  'volume',
  'marketCap',
  'peRatio',
  'week52High',
  'week52Low',
  'ytdChange',
];

export const enrichDetailedQuotes = (
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
) => {
  const data = pies.map((slice) => {
    const iexData = _.get(quotes, [slice.symbol], null);
    if (!iexData) return null;

    const { quote, logo } = iexData as IexBatchRequestDetailed;
    return {
      api: _.pick(quote, iexQuoteKeys),
      companyName: quote.companyName,
      volume: numberDisplay(quote.volume),
      shares: slice.shares,
      equity: currencyDisplay(quote.latestPrice * slice.shares),
      logo,
    };
  });

  return {
    summary: {
      balance: currencyDisplay(5),
      dayChange: percentDisplay(5, 10),
    },
    quotes:_.orderBy( _.compact(data), ['equity.val'], ['desc']),
  };
};
