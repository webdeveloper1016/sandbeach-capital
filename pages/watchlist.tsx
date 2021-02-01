import Link from 'next/link';
import { AirTableStockAccounts } from '../ts';

const accountLinks: AirTableStockAccounts[] = [
  'robinhood',
  'm1-taxable',
  'm1-emergency',
  'bryan-roth',
];

const AccountsPage = () => {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-gray-500 text-lg">Watchlist:</h3>
      </div>
      <ul>
        {accountLinks.map((l) => (
          <li key={l}>
            <Link href={`/account/${l}`}>
              <a>{l}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsPage;
