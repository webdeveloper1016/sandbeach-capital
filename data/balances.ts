export const currentAnnualIncome = [95000, 4000, 5000].reduce((a, b) => a + b, 0);

export const currentBalances = {
  stEmergency: 15493,
  stStockBond: 862,
  ltDiversified: 1077,
  ltStocks: 853,
  cryptoCoinbase: 865,
  cryptoBlockFi: 3483,
  rJamieIRA: 43095,
  rJamieRoll: 41137,
  rBryanIRA: 32000,
  rBryan401k: 3214,
};

export const currentMarketData = {
  cryptoCoinbase: {
    btc: 0.02931281
  },
  cryptoBlockFi: {
    btc: 0.14778107
  },
  rJamieRoll: {
    qqq: 133
  },
  rJamieIRA: {
    vt: 440
  }
}

export const unscheduledContributions = [100, 100, 2400].reduce((a, b) => a + b, 0);

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
    rBryan401k: 2895,
  },
  2022: {},
  2023: {}
}
