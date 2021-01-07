export const currentBalances = {
  stCash: 2000,
  stSavings: 10008,
  stEmergency: 911,
  stStablecoins: 1000,
  ltM1Taxable: 1208,
  ltM1Spec: 951,
  cryptoCoinbase: [1144, 340].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 4589,
  cryptoCelsius: 903,
  rJamieIRA: 43953,
  rJamieRoll: 41728,
  rBryanIRA: [1914, 30925.43].reduce((a, b) => a + b, 0),
  rBryan401k: 3270,
};

export const currentMarketData = {
  cryptoCoinbase: {
    btc: [0.03040964, 0.01127824].reduce((a, b) => a + b, 0),
    eth: 0.122735
  },
  cryptoBlockFi: {
    btc: 0.15666763,
  },
  cryptoCelsius: {
    usdc: 844.56,
    comp: 0.34110
  },
  rJamieRoll: {
    qqq: 133,
  },
  rJamieIRA: {
    vt: 440.645,
    vtwax: 96.236,
  },
};
