import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { links } from '../routes';
import IexStatus from './IexStatus';
import { Burger } from './Icons'

const Nav1 = () => {
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
          <li className="cursor-pointer" onClick={auth.logout}>
            Logout
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 min-h-screen border-r border-current shadow w-16">
      <ul>
        <li>Home</li>
        <li>Accounts</li>
        <li>Goals</li>
        <li>Watchlist</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <div className="ml-16">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-2xl hidden md:block">Sand Beach Capital</h1>
        <IexStatus />
        <button className="md:hidden"><Burger /></button>
      </header>
    </div>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="ml-16">
      <main className="container container-extended p-4 md:px-8 lg:px-20">
        {children}
      </main>
    </div>
  );
};
