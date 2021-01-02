import { format } from 'date-fns';
import { IexCryptoQuoteModel, IexCryptoQuoteModelEnriched } from '../ts/iex';
import { currencyDisplay } from './calc';

export const formatCryptoQuote = (
  data?: IexCryptoQuoteModel,
): IexCryptoQuoteModelEnriched | null => {
  if (!data) return null;

  return {
    api: data,
    price: currencyDisplay(Number(data.latestPrice), ' ⚡️'),
    updatedAt: format(data.latestUpdate, 'MM/dd/yyyy p'),
  };
};
