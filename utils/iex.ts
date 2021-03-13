import {
  IexCryptoQuoteModel,
  IexCryptoQuoteModelEnriched,
  IexStockQuoteModel,
  IexStockQuoteModelEnriched,
  IexStockQuoteDetailedModel,
  IexStockQuoteDetailedModelEnriched
} from '../ts/iex';
import {
  currencyDisplay,
  dateDisplay,
  percentDisplay,
  numberDisplay,
  percDisplayWithClass,
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
  quote: IexStockQuoteModel,
): IexStockQuoteDetailedModel => {
  return {
    symbol,
    companyName: quote.companyName,
    symbolCompany: {
      symbol,
      name: quote.companyName,
    },
    shares,
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
    // logo: logo ? logo.url : null,
    // tags: slice.tags ? slice.tags : [],
    // sector: slice.sector,
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
};
