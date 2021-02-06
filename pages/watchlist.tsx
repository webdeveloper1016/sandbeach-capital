import Link from 'next/link';
import { AirTableAccountRoutes } from '../ts';

const accountLinks: AirTableAccountRoutes[] = [
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
