import { format } from 'date-fns';
import _ from 'lodash';
import numeral from 'numeral';
import { NumberDisplayModel, PercChangeModel } from '../ts/types';

export const sumAccounts = (data: any[]): number =>
  data.reduce((accum, current) => accum + current.balance, 0);

export const sumPies = (data: any[]): number =>
  data.reduce((accum, current) => accum + current.totalValue.val, 0);

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const numberFormatter = new Intl.NumberFormat('en-US');

export const percentFormatter = (a: number, b: number): string =>
  `${Math.round((a / b) * 100 * 100) / 100}%`;

export const percentDisplay = (
  a: number,
  b: number,
  annoatePositive?: boolean,
): NumberDisplayModel => {
  const val = a / b;
  return {
    val,
    display:
      annoatePositive && val > 0
        ? `+${percentFormatter(a, b)}`
        : percentFormatter(a, b),
  };
};

export const percDisplayWithClass = (
  a: number,
  b: number,
  annoatePositive?: boolean,
): PercChangeModel => {
  const perc = percentDisplay(a, b, annoatePositive);
  const css = (): string => {
    switch (true) {
      case perc.val > 0:
        return 'text-green-500';
      case perc.val < 0:
        return 'text-red-500';
      default:
        return '';
    }
  };

  return {
    class: css(),
    perc,
  };
};

export const percDisplayWithClassThreshold = (
  a: number,
  b: number,
  threshold: {
    positive: number;
    negative: number;
  },
  annoatePositive?: boolean,
): PercChangeModel => {
  const perc = percentDisplay(a, b, annoatePositive);
  const css = (): string => {
    switch (true) {
      case perc.val > threshold.positive:
        return 'text-green-500';
      case perc.val < threshold.negative:
        return 'text-red-500';
      default:
        return '';
    }
  };

  return {
    class: css(),
    perc,
  };
};

export const currencyDisplay = (
  a: number,
  annotate = '',
): NumberDisplayModel => ({
  val: a,
  display: `${currencyFormatter.format(a)}${annotate}`,
});

export const numberDisplay = (a: number): NumberDisplayModel => ({
  val: a,
  display: _.toUpper(numeral(a).format('0.0a')),
});

export const numberDisplayLong = (a: number): NumberDisplayModel => ({
  val: a,
  display: _.toUpper(numeral(a).format('0.000000a')),
});

export const dateDisplay = (dateIn: number | Date): string =>
  format(dateIn, 'MM/dd/yyyy p');

export const dateDisplayShort = (dateIn: number | Date): string => {
  try {
    const formatted = format(new Date(dateIn), 'M/d');
    return formatted;
  } catch (error) {
    return '-';
  }
};

export const percChangeSort = (
  row1: PercChangeModel,
  row2: PercChangeModel,
): 1 | -1 => {
  try {
    return row1.perc.val > row2.perc.val ? 1 : -1;
  } catch (error) {
    return 1;
  }
};
