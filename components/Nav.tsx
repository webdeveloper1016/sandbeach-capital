import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { links } from '../routes';
import IexStatus from './IexStatus';

const Nav = () => {
  const auth = useAuth();
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-green-500 no-underline">Home</a>
          </Link>
        </li>
        <IexStatus />
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link href={href}>
                <a className="no-underline px-4 py-2 font-bold text-white bg-green-500 rounded">
                  {label}
                </a>
              </Link>
            </li>
          ))}
          <li className="cursor-pointer" onClick={auth.logout}>Logout</li>
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
