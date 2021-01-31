import { format } from 'date-fns';
import numeral from 'numeral';
import { NumberDisplayModel } from '../ts/types';

export const sumAccounts = (data: any[]): number =>
  data.reduce((accum, current) => accum + current.balance, 0);

export const sumPies = (data: any[]): number =>
  data.reduce((accum, current) => accum + current.approxVal.val, 0);

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const numberFormatter = new Intl.NumberFormat('en-US');

export const percentFormatter = (a: number, b: number): string =>
  `${Math.round((a / b) * 100 * 100) / 100}%`;

export const percentDisplay = (a: number, b: number): NumberDisplayModel => ({
  val: a / b,
  display: percentFormatter(a, b),
});

export const currencyDisplay = (
  a: number,
  annotate = '',
): NumberDisplayModel => ({
  val: a,
  display: `${currencyFormatter.format(a)}${annotate}`,
});

export const numberDisplay = (a: number): NumberDisplayModel => ({
  val: a,
  display: numeral(a).format('0.0a'),
});

export const dateDisplay = (dateIn: number | Date): string =>
  format(dateIn, 'MM/dd/yyyy p');
