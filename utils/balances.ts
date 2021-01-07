import get from 'lodash.get';
import { NumberDisplayModel, PieModel, AccountModel } from '../ts/types';
import { IexFetchSimpleQuoteModel, IexQuoteModelEnriched } from '../ts/iex';
import { priceAnnotate } from './iex';
import { currencyDisplay } from './calc';

export const determineBalanceDisplay = (
  account: number,
  accountLive: boolean,
  pie: number,
  pieLive: boolean,
  target: number,
): NumberDisplayModel => {
  let balance = 0;
  let annotate = '';

  switch (true) {
    // we have live data at the slice level
    case Boolean(pieLive):
      balance = pie;
      annotate = priceAnnotate;
      break;
    // we have live data at the account level, but need to calc percent for pie
    case Boolean(accountLive):
      balance = account * target;
      annotate = '*';
      break;
    // no live data, approx value based on target weight
    default:
      balance = account * target;
      break;
  }

  return currencyDisplay(balance, annotate);
};

export const injectLiveQuotes = (
  data: AccountModel[],
  liveQuotes: IexFetchSimpleQuoteModel,
): AccountModel[] => {
  return data.map((account) => {
    const startingBal = account.balance;
    // for each account, map over each pie slice...
    const pieWithLiveData: PieModel[] = account.pie.map((slice) => {
      // if no market data, return an approx balance
      if (!slice.marketData) {
        return {
          ...slice,
          balance: startingBal * slice.targetPercent,
          liveBalance: false,
        };
      }
      // map over market data
      // cross ref with IEX data
      const enrichedMarketData = slice.marketData.map((m) => {
        const match: IexQuoteModelEnriched | undefined = get(
          liveQuotes,
          [m.market, m.ticker],
          undefined,
        );
        if (!match) return m;

        // add IEX data to market data object
        return {
          ...m,
          liveQuote: match,
          balance: m.shares * match.price.val,
          liveBalance: true,
        };
      });
      // return the pie slice with the live data
      return {
        ...slice,
        balance: enrichedMarketData.reduce(
          (accum, current) => accum + current.balance || 0,
          0,
        ),
        liveBalance: true,
        marketData: enrichedMarketData,
      };
    });

    // if we have cross referenced live data, use that
    // if not, return existing manual balance
    const haveLiveBalance = pieWithLiveData.find((s) => s.liveBalance);
    return {
      ...account,
      balance: pieWithLiveData.reduce(
        (accum, current) => accum + current.balance || 0,
        0,
      ),
      liveBalance: Boolean(haveLiveBalance),
      pie: haveLiveBalance ? pieWithLiveData : account.pie,
    };
  });
};
