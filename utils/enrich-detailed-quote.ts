import _, { xor } from 'lodash';
import { currencyDisplay, percentDisplay, sumPies } from '../utils/calc';
import { formatDetailedQuote } from './iex';
import {
  AirTablePieModel,
  IexDetailedQuoteModel,
  IexBatchRequestDetailed,
  EnrichedDetailedQuoteModel,
  AirTableAccountModelExtended,
  APIPortfolioModel,
} from '../ts';

const mergeAccounts = (
  accts: AirTableAccountModelExtended[],
): AirTableAccountModelExtended => {
  return accts.find((x) => x.parentAccount) || accts[0];
};

export const enrichDetailedQuotes = (
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
  enrichedAcctData: Omit<APIPortfolioModel, 'supportingData'>,
  accountName?: string,
  aggregated?: boolean,
): EnrichedDetailedQuoteModel | null => {
  if (!accountName || _.isEmpty(pies)) return null;

  const data = pies
    .map((slice) => {
      const iexData = _.get(quotes, [slice.symbol], null);
      if (!iexData) {
        return null;
      }

      const { logo, ...quote } = iexData as IexBatchRequestDetailed;
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



  const orderedQuote = _.orderBy(accountWithWeight, ['equity.val'], ['desc'])

  const dayChangePerc = percentDisplay(
    sumAccount - sumPrevClose,
    sumAccount,
    true,
  );

  const account = aggregated
    ? mergeAccounts(
        enrichedAcctData.accounts
          .filter((a) => a.id.includes(accountName))
          .filter((x) => !x.crypto),
      )
    : enrichedAcctData.accounts.find((a) => a.id === accountName);
  const menuItems = enrichedAcctData.accounts
    .filter((a) => a.showInAccountsMenu)
    .map((x) => x.nicknameId);
  const viewTotal = sumPies(
    enrichedAcctData.accounts.filter((a) => a.showInAccountsMenu),
  );

  if (!account) return null;

  return {
    menuItems,
    account,
    noTargets:
      account.parentAccount ||
      _.isEmpty(accountWithWeight.filter((x) => x.slicePercent.val > 0)),
    summary: {
      balance: currencyDisplay(sumAccount),
      balanceDisplay: `${currencyDisplay(sumAccount).display} / ${
        currencyDisplay(viewTotal).display
      }`,
      viewTotal: currencyDisplay(viewTotal),
      prevBalance: currencyDisplay(sumPrevClose),
      dayChange: {
        class: dayChangePerc.val > 0 ? 'text-green-500' : 'text-red-500',
        perc: dayChangePerc,
      },
      weight: account?.barbellWeights
        ? {
            tgt: percentDisplay(account.barbellWeights, 1),
            actual: percentDisplay(sumAccount, viewTotal),
          }
        : {
            tgt: { display: '-', val: 0 },
            actual: percentDisplay(sumAccount, viewTotal),
          },
    },
    quotes: orderedQuote.map((o, k) => ({
      ...o,
      rank: k + 1,
    })),
  };
};
