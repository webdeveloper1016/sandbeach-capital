import _ from 'lodash';
import { percentDisplay, currencyDisplay } from './calc';
import { enrichSummary } from './enrich-summary';
import { enrichAllHoldings } from './enrich-all-holdings';
import { enrichStats, categoryLabels } from './enrich-stats';
import {
  AirTableAccountModel,
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexDetailedQuoteModel,
  CMCEnrichedCryptoModel,
  APIPortfolioModelSimple,
  IexUrlModel,
} from '../ts';
import { pieSlimTop, accountWeightFilter } from '../config';

export const enrichAccounts = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
  cryptoData: CMCEnrichedCryptoModel,
  iex: IexUrlModel,
): APIPortfolioModelSimple => {
  const accountsWithQuotes = accounts.map((account) => {
    let pie = [];
    // enrich account with crypto or stock data
    if (account.crypto) {
      // crypto data already has prices and rolled up values
      const findPie = cryptoData.holdingsByAccount.filter(
        (p) => p.account === account.id,
      );
      pie = findPie.map((p) => ({
        ...p,
        shares: p.amount,
        sector: 'N/A',
      }));
    } else {
      // filter pies by account and calc value with iex data
      const findPie = pies.filter((p) => p.account === account.id);
      pie = findPie.map((slice) => {
        const quote = quotes[slice.symbol] || null;
        return {
          ...slice,
          symbol: slice.symbol || slice.sector,
          sliceTotalValue: currencyDisplay(
            quote ? quote.quote.latestPrice * slice.shares : slice.shares,
          ),
        };
      });
    }

    const sumAccount = pie.reduce(
      (accum, current) => accum + current.sliceTotalValue.val,
      0,
    );

    const pieWithWeight = pie.map((p) => ({
      ...p,
      sliceWeight: percentDisplay(p.sliceTotalValue.val, sumAccount),
    }));

    return {
      ...account,
      nicknameId: {
        nickname: account.nickname,
        id: account.id,
      },
      timeframe: categoryLabels[account.timeframe],
      pie: _.orderBy(pieWithWeight, ['sliceTotalValue.val'], ['desc']),
      pieSlim: _.orderBy(pieWithWeight, ['sliceTotalValue.val'], ['desc'])
        .filter((i) => i.sliceTotalValue.val > 0)
        .slice(0, pieSlimTop),
      pieSlimTopOnly: pieWithWeight.length > pieSlimTop,
      pieSlimTopOnlyCount: pieSlimTop,
      totalValue: currencyDisplay(sumAccount),
      weight: percentDisplay(sumAccount, 0),
    };
  });

  const portfolioTotal = accountsWithQuotes.reduce(
    (accum, current) => accum + current.totalValue.val,
    0,
  );

  const accountsWithWeight = accountsWithQuotes
    .map((a) => ({
      ...a,
      weight: percentDisplay(a.totalValue.val, portfolioTotal),
    }))

  const exCryptoPortfolioTotal = accountsWithWeight
    .filter((a) => !a.crypto)
    .reduce((accum, current) => accum + current.totalValue.val, 0);

  return {
    summary: enrichSummary(portfolioTotal, exCryptoPortfolioTotal, cryptoData),
    stats: enrichStats(accountsWithWeight, portfolioTotal),
    accounts: accountsWithWeight,
    aggregatedHoldings: enrichAllHoldings(
      accounts,
      pies,
      quotes,
      cryptoData,
      portfolioTotal,
    ),
    iex,
  };
};
