import { accountRoute } from '../config';

export const links = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/account/crypto', label: 'Crypto', icon: 'crypto' },
  { href: `/account/${accountRoute}`, label: 'Watchlists', icon: 'watchlist' },
  { href: '/all', label: 'All', icon: 'chart' },
  { href: '/accounts', label: 'Accounts', icon: 'accounts' },
];
