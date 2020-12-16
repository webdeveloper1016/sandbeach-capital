export const watchlist = {
  growth: ['CRSP', 'TDOC'],
  value: ['WFC', 'BAC', 'LMT', 'PSA'],
  monthly: {
    buy: [
      {
        ticker: 'MELI',
        account: 'Stocks',
        notes: 'replace TGT',
        status: 'done',
      },
    ],
    sell: [
      {
        ticker: 'TGT',
        account: 'Stocks',
        notes: 'replacing with MELI',
        status: 'done',
      },
    ],
  },
};
