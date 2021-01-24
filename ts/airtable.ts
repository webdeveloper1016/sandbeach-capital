export type AirTableTablesType = 'Crypto' | 'Stocks' | 'Watchlist';

export interface AirTableCryptoModel {
  id: string;
  account: string;
  symbol: string;
  coin: string;
  amount: number;
  stablecoin?: boolean;
}
