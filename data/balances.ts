export const currentAnnualIncome = [95000, 4000, 5000].reduce(
  (a, b) => a + b,
  0,
);

export const currentBalances = {
  stCash: 3000,
  stSavings: 12493,
  stEmergency: 862,
  stStablecoins: 186,
  ltM1: [1077, 853],
  cryptoCoinbase: 1022,
  cryptoBlockFi: 4151,
  rJamieIRA: 43095,
  rJamieRoll: 41137,
  rBryanIRA: 32000,
  rBryan401k: 3214,
};

export const unscheduledContributions = [100, 100, 2400].reduce(
  (a, b) => a + b,
  0,
);

export const currentContributions = {
  stCash: 0,
  stSavings: [36.57].reduce((a, b) => a + b, 0),
  stEmergency: 50,
  stM1: 50,
  stStablecoins: 0,
  ltM1: [100, 100].reduce((a, b) => a + b, 0),
  cryptoCoinbase: [15, 10].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 100,
  rJamieIRA: 51.26,
  rJamieRoll: 0,
  rBryanIRA: 100,
  rBryan401k: 292,
};

export const currentMarketData = {
  cryptoCoinbase: {
    btc: 0.02931281,
  },
  cryptoBlockFi: {
    btc: 0.14778107,
  },
  rJamieRoll: {
    qqq: 133,
  },
  rJamieIRA: {
    vt: 440.645,
    vtwax: 96.236,
  },
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
  2023: {},
};
