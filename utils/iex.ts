import {
  IexCryptoQuoteModel,
  IexCryptoQuoteModelEnriched,
  IexStockQuoteModel,
  IexStockQuoteModelEnriched,
} from '../ts/iex';
import { currencyDisplay, dateDisplay } from './calc';

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
