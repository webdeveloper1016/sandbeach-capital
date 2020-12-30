import { getWeek } from 'date-fns';
import {
  ValueWeightModel,
  AccountModelExtended,
  SavingsGoalModel,
} from '../ts/types';
import { percentDisplay, currencyDisplay } from './calc';

export const runSavingsAnalysis = (
  allAccounts: AccountModelExtended[],
  savingsGoals: SavingsGoalModel,
): ValueWeightModel[] => {
  const allSavingsPre = allAccounts
    .filter((a) => a.preTax)
    .reduce((accum, current) => accum + current.biWeeklySavings, 0);
  const allSavingsPost = allAccounts
    .filter((a) => !a.preTax)
    .reduce((accum, current) => accum + current.biWeeklySavings, 0);
  const allBiWeekSavings = allAccounts.reduce(
    (accum, current) => accum + current.biWeeklySavings,
    0,
  );
  const allSavingST = allAccounts
    .filter((a) => a.category === 'short-term')
    .reduce((accum, current) => accum + current.biWeeklySavings, 0);
  const allSavingLT = allAccounts
    .filter((a) => a.category === 'long-term')
    .reduce((accum, current) => accum + current.biWeeklySavings, 0);
  const allSavingR = allAccounts
    .filter((a) => a.category === 'retirement')
    .reduce((accum, current) => accum + current.biWeeklySavings, 0);

  const weeksSoFar = getWeek(new Date(), {weekStartsOn: 1, firstWeekContainsDate: 7});
  const savingsYTD =
    allBiWeekSavings * (weeksSoFar / 2) + savingsGoals.unscheduledContributions;
  const savingsProjected =
    allBiWeekSavings * 26 + savingsGoals.unscheduledContributions;

  return [
    {
      label: 'Per-Pay',
      value: currencyDisplay(allBiWeekSavings),
      weight: {
        val: 0,
        display: 'N/A',
      },
    },
    {
      label: 'Pre-Tax',
      value: currencyDisplay(allSavingsPre),
      weight: {
        val: 0,
        display: 'N/A',
      },
    },
    {
      label: 'Post-Tax',
      value: currencyDisplay(allSavingsPost),
      weight: {
        val: 0,
        display: 'N/A',
      },
    },
    {
      label: 'Short Term',
      value: currencyDisplay(allSavingST),
      weight: percentDisplay(allSavingST, allBiWeekSavings),
    },
    {
      label: 'Long Term',
      value: currencyDisplay(allSavingLT),
      weight: percentDisplay(allSavingLT, allBiWeekSavings),
    },
    {
      label: 'Retirement',
      value: currencyDisplay(allSavingR),
      weight: percentDisplay(allSavingR, allBiWeekSavings),
    },
    // recurring plus one off
    {
      label: '~YTD',
      value: currencyDisplay(savingsYTD),
      weight: percentDisplay(savingsYTD, savingsGoals.annualIncome),
    },
    {
      label: 'Annual - Scheduled',
      value: currencyDisplay(allBiWeekSavings * 26),
      weight: percentDisplay(allBiWeekSavings * 26, savingsGoals.annualIncome),
    },
    // recurring plus one off
    {
      label: 'Annual - Projected',
      value: currencyDisplay(savingsProjected),
      weight: percentDisplay(savingsProjected, savingsGoals.annualIncome),
    },
  ];
};
