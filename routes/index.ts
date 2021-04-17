import { accountRoute } from '../config';

export const links = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/accounts', label: 'Accounts', icon: 'accounts' },
  { href: '/all', label: 'All', icon: 'chart' },
  { href: `/account/${accountRoute}`, label: 'Watchlists', icon: 'watchlist' },
  { href: '/account/crypto', label: 'Crypto', icon: 'crypto' },
];
