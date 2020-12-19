import {
  SavingsGoalModel,
  QuotesModel,
  PortfolioGoalsModel,
} from '../ts/types';

export const quotes: QuotesModel[] = [
  { quote: 'Time in the market beats timing the market.' },
  {
    quote:
      'Accumulate assets. If the price goes up, good they are worth more. If the price goes down, good you can buy more.',
  },
];

export const savings: SavingsGoalModel = {
  annualIncome: 95000,
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
