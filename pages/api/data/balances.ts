export const currentBalances = {
  stCash: 2000,
  stSavings: 10008,
  stEmergency: 1045,
  stStablecoins: 845,
  ltM1Taxable: 1333,
  ltM1Spec: 1238,
  cryptoCoinbase: [1144, 340].reduce((a, b) => a + b, 0),
  cryptoBlockFi: 6347,
  cryptoCelsius: 903,
  rJamieIRA: 45693,
  rJamieRoll: 43219,
  rBryanIRA: 34228.71,
  rBryan401k: 4041,
};

export const currentMarketData = {
  cryptoCoinbase: {
    btc: [
      0.03585229, // cb
      0.00871754, // cb pro
    ].reduce((a, b) => a + b, 0),
  },
  cryptoBlockFi: {
    btc: 0.18386188,
  },
  cryptoCelsius: {
    usdc: 846.59,
    comp: 0.3411,
    eth: 0.22407,
    snx: 1.74425,
    uni: 6.53
  },
  rJamieRoll: {
    qqq: 133.239,
  },
  rJamieIRA: {
    vt: 440.645,
    vtwax: 97.790,
  },
};
