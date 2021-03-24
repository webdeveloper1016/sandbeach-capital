import _ from 'lodash';
import {
  currencyDisplay,
  percentDisplay,
  sumPies,
  numberDisplay,
  percDisplayWithClass,
} from '../utils/calc';
import { formatDetailedQuote } from './iex';
import {
  AirTablePieModel,
  IexDetailedQuoteModel,
  IexBatchRequestDetailed,
  EnrichedDetailedQuoteModel,
  APIPortfolioModel,
} from '../ts';

export const enrichDetailedQuotes = (
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
  enrichedAcctData: Omit<APIPortfolioModel, 'supportingData'>,
  accountName?: string,
): EnrichedDetailedQuoteModel | null => {
  if (!accountName) return null;

  const data = pies
    .map((slice) => {
      const iexData = _.get(quotes, [slice.symbol], null);
      if (!iexData) {
        return null;
      }

      const { quote, logo } = iexData as IexBatchRequestDetailed;
      const detailed = formatDetailedQuote(slice.symbol, slice.shares, quote);
      return {
        ...detailed,
        logo: logo ? logo.url : null,
        tags: slice.tags ? slice.tags : [],
        sector: slice.sector,
        slicePercent: slice.slicePercent
          ? percentDisplay(slice.slicePercent, 1)
          : { val: 0, display: '-' },
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

  const account = enrichedAcctData.accounts.find((a) => a.id === accountName);
  const menuItems = enrichedAcctData.accounts
    .filter((a) => a.showInAccountsMenu)
    .map((x) => x.nicknameId);
  const rhTotal = sumPies(
    enrichedAcctData.accounts.filter((a) => a.robinhoodBuckets),
  );
  return {
    menuItems,
    account,
    summary: {
      balance: currencyDisplay(sumAccount),
      prevBalance: currencyDisplay(sumPrevClose),
      dayChange: {
        class: dayChangePerc.val > 0 ? 'text-green-500' : 'text-red-500',
        perc: dayChangePerc,
      },
      weight: account.robinhoodBuckets
        ? {
            tgt: percentDisplay(account.robinhoodBuckets, 1),
            actual: percentDisplay(account.totalValue.val, rhTotal),
          }
        : null,
    },
    quotes: _.orderBy(accountWithWeight, ['equity.val'], ['desc']),
  };
};
