export const currentBalances = {
  stCash: 2000,
  stSavings: 12493,
  stEmergency: 911,
  stStablecoins: 1000,
  ltM1: [1208, 951],
  cryptoCoinbase: [1144, 340].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 4589,
  rJamieIRA: 43953,
  rJamieRoll: 41728,
  rBryanIRA: [1914, 30925.43].reduce((a, b) => a + b, 0),
  rBryan401k: 3270,
};

export const currentMarketData = {
  cryptoCoinbase: {
    btc: 0.02931281,
  },
  cryptoBlockFi: {
    btc: 0.14778107,
    usdc: 1000,
  },
  rJamieRoll: {
    qqq: 133,
  },
  rJamieIRA: {
    vt: 440.645,
    vtwax: 96.236,
  },
};
