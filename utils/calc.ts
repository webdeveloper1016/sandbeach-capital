import { NumberDisplayModel, AccountModel, PieModelExtended } from '../ts/types';

export const sumAccounts = (data: AccountModel[]): number =>
  data.reduce((accum, current) => accum + current.balance, 0);

export const sumPies = (data: PieModelExtended[]): number =>
  data.reduce((accum, current) => accum + current.approxVal.val, 0);

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const percentFormatter = (a: number, b: number): string =>
  `${Math.round((a / b) * 100 * 100) / 100}%`;

export const percentDisplay = (a: number, b: number): NumberDisplayModel => ({
  val: a / b,
  display: percentFormatter(a, b),
});

export const currencyDisplay = (a: number): NumberDisplayModel => ({
  val: a,
  display: currencyFormatter.format(a),
});
