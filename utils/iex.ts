import {
  IexCryptoQuoteModel,
  IexCryptoQuoteModelEnriched,
  IexStockQuoteModel,
  IexStockQuoteModelEnriched,
  IexStockQuoteDetailedModel,
  IexBatchRequestDetailed,
} from '../ts/iex';
import {
  currencyDisplay,
  dateDisplay,
  numberDisplay,
  percentDisplay,
  percDisplayWithClass,
  percDisplayWithClassThreshold,
  dateDisplayShort,
} from './calc';

export const priceAnnotate = ' ⚡';

export const formatCryptoQuote = (
  data?: IexCryptoQuoteModel,
): IexCryptoQuoteModelEnriched | null => {
  if (!data) return null;

  return {
    api: data,
    price: currencyDisplay(Number(data.latestPrice), priceAnnotate),
    updatedAt: dateDisplay(data.latestUpdate),
  };
};

export const formatStockQuote = (
  data?: IexStockQuoteModel,
): IexStockQuoteModelEnriched | null => {
  if (!data) return null;

  return {
    api: data,
    price: currencyDisplay(data.latestPrice, priceAnnotate),
    updatedAt: dateDisplay(data.latestUpdate),
  };
};

export const formatDetailedQuote = (
  symbol: string,
  shares: number,
  iexData: IexBatchRequestDetailed,
): IexStockQuoteDetailedModel => {
  const { quote, stats } = iexData;
  return {
    symbol,
    companyName: quote.companyName,
    symbolCompany: {
      symbol,
      name: quote.companyName,
    },
    shares,
    sharesDisplay: numberDisplay(shares),
    equity: currencyDisplay(quote.latestPrice * shares),
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
    changePercent: percDisplayWithClass(quote.changePercent, 1, true),
    equityPrevClose: currencyDisplay(quote.previousClose * shares),
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
              perc: { display: '-', val: 0 },
              class: '',
            }
          : percDisplayWithClassThreshold(
              quote.latestPrice - quote.week52High,
              quote.week52High,
              { positive: -0.05, negative: -0.15 },
            ),
      ytdChange: percDisplayWithClass(quote.ytdChange, 1, true),
      dividendYield: percentDisplay(stats.dividendYield, 1),
      nextDividendDate:
        !stats.nextDividendDate || stats.nextDividendDate === '0'
          ? '-'
          : dateDisplayShort(new Date(stats.nextDividendDate)),
      nextEarningsDate:
        !stats.nextDividendDate || stats.nextDividendDate === '0'
          ? '-'
          : dateDisplayShort(new Date(stats.nextEarningsDate)),
      beta: numberDisplay(stats.beta),
    },
  };
};
