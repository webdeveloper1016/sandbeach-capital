export const watchlist = {
  growth: ['CRSP', 'TDOC'],
  value: ['WFC'],
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
