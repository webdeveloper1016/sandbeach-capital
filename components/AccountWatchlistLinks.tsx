import Link from 'next/link';
import { labels } from './AccountBalanceHeader';
import { AirTableStockAccounts } from '../ts';

const accountLinks: AirTableStockAccounts[] = [
  'robinhood',
  'm1-taxable',
  'm1-emergency',
  'bryan-roth',
];

const AccountWatchlistLinks = ({
  active,
}: {
  active: AirTableStockAccounts;
}) => {
  return (
    <div className="mb-4 mt-2 overflow-x-auto ">
      <div className="flex justify-between items-center">
        {accountLinks.map((l) => (
          <Link href={`/account/${l}`} key={l}>
            <a
              className={`border border-current rounded py-1 px-2 hover:bg-gray-900 ${
                active === l && 'text-green-500'
              }`}
            >
              {labels[l]}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountWatchlistLinks;
