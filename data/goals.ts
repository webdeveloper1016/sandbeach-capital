import {
  SavingsGoalModel,
  QuotesModel,
  PortfolioGoalsModel,
} from '../ts/types';
import { currentAnnualIncome } from './balances';

export const quotes: QuotesModel[] = [
  { quote: `Scared money don't make no money.` },
  { quote: 'Time in the market beats timing the market.' },
  {
    quote:
      'Accumulate assets. If the price goes up, good they are worth more. If the price goes down, good you can buy more.',
  },
];

export const savings: SavingsGoalModel = {
  annualIncome: currentAnnualIncome,
  preTaxSavingsPercent: 0.08,
  goalStatements: [
    { goal: 'Save 25% of annual salary' },
    { goal: 'Accumulate half a BTC' },
  ],
  biWeeklySavingsGoal: 400,
};

const goals: PortfolioGoalsModel = {
  quotes,
  savings,
};

export default goals;
