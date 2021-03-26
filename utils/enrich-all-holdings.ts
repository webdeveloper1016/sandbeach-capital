import _ from 'lodash';
import { percentDisplay } from './calc';
import { formatDetailedQuote } from './iex';
import { mapCryptoToIEX } from './enrich-crypto';
import {
  AirTablePieModel,
  IexSimpleQuoteModel,
  IexDetailedQuoteModel,
  IexStockQuoteDetailedModelEnriched,
  AirTableAccountModel,
  EnrichedCryptoModel,
} from '../ts';

export const enrichAllHoldings = (
  accounts: AirTableAccountModel[],
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
  cryptoData: EnrichedCryptoModel,
  portfolioTotal: number,
): IexStockQuoteDetailedModelEnriched[] => {
  const holdings = Object.keys(quotes)
    .map((symbol) => {
      const quote = quotes[symbol];
      const rollup = pies
        .filter((p) => p.symbol === symbol)
        .reduce(
          (accum, current) => ({
            ...accum,
            shares: accum.shares + current.shares,
            sector: `${current.assetClass} - ${current.sector}`,
            accounts: [
              ...accum.accounts,
              accounts.find((f) => f.id === current.account).nickname,
            ],
            targetPercent: current.targetPercent || null,
            exclude: accounts.find((f) => f.id === current.account)
              .excludeFromAnalysis,
          }),
          {
            shares: 0,
            sector: '',
            accounts: [],
            targetPercent: null,
            exclude: false,
          },
        );
      const detailedQuote = formatDetailedQuote(symbol, rollup.shares, quote);
      return {
        ...detailedQuote,
        logo: null,
        sector: rollup.sector,
        accounts: rollup.accounts,
        accountsJoined: rollup.accounts.join(', '),
        exclude: rollup.exclude,
        targetPercent: rollup.targetPercent
          ? percentDisplay(rollup.targetPercent, 1)
          : { val: 0, display: '-' },
        weight: percentDisplay(detailedQuote.equity.val, portfolioTotal),
      };
    })
    .filter((x) => !x.exclude);

  const cryptoHoldings = mapCryptoToIEX(
    cryptoData.coinsWithAmount.filter((x) => !x.stablecoin),
    portfolioTotal,
  );

  const ordered = _.orderBy(
    [...holdings, ...cryptoHoldings],
    ['equity.val'],
    ['desc'],
  );

  return ordered.map((o, k) => ({
    ...o,
    rank: k + 1,
  }));
};
