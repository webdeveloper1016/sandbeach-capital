export const unscheduledContributions = [2400].reduce((a, b) => a + b, 0);

export const unscheduledIncome = [2400].reduce((a, b) => a + b, 0);

export const bryanSalary = {
  annual: 95000,
  postTax: 2631,
  firstPay: new Date(2021, 1, 8),
};

export const currentAnnualIncome = [
  bryanSalary.annual,
  4000,
  5000,
  unscheduledIncome,
].reduce((a, b) => a + b, 0);

export const m1Smart = {
  // these are monthly
  total: (bryanSalary.postTax * 0.2 * 26) / 12,
  ira: 500,
  emergency: 150,
  taxable: 150,
};

export const currentContributions = {
  stCash: 0,
  stSavings: [36.57, 21.69].reduce((a, b) => a + b, 0),
  stEmergency: (m1Smart.emergency * 12) / 26,
  stStablecoins: 0,
  ltM1Taxable: (m1Smart.taxable * 12) / 26,
  ltM1Spec:
    ((m1Smart.total - m1Smart.ira - m1Smart.emergency - m1Smart.taxable) * 12) / 26,
  cryptoCoinbase: [50].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 0,
  cryptoCelsius: 0,
  rJamieIRA: 51.26,
  rJamieRoll: 0,
  rBryanIRA: (m1Smart.ira * 12) / 26,
  rBryan401k: (bryanSalary.annual * 0.1) / 26,
};
