export const currentAnnualIncome = [95000, 4000, 5000].reduce((a, b) => a + b, 0);

export const currentBalances = {
  stEmergency: 15493,
  stStockBond: 820,
  ltDiversified: 1005,
  ltStocks: 735,
  cryptoCoinbase: 741,
  cryptoBlockFi: 3483,
  rJamieIRA: 42808,
  rJamieRoll: 40146,
  rBryanIRA: 1812,
  rBryanRoll: 31512,
  rBryan401k: 2896,
};

export const currentContributions = {
  stEmergency: [36.57].reduce((a, b) => a + b, 0),
  stStockBond: 50,
  ltDiversified: 100,
  ltStocks: 100,
  cryptoCoinbase: [15, 10].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 100,
  rJamieIRA: 51.26,
  rJamieRoll: 0,
  rBryanIRA: 100,
  rBryanRoll: 0,
  rBryan401k: 292,
};

export const balancesYearStart = {
  2021: {
    stEmergency: 13004,
    stStockBond: 800,
    ltDiversified: 995,
    ltStocks: 600,
    cryptoCoinbase: 712,
    cryptoBlockFi: 2119,
    rJamieIRA: 42000,
    rJamieRoll: 39000,
    rBryanIRA: 31590,
    rBryanRoll: 30000,
    rBryan401k: 2895,
  },
  2022: {},
  2023: {}
}
