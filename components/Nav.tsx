import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { useQueryClient } from 'react-query';
import useAuth from '../hooks/useAuth';
import { links } from '../routes';
import IexStatus from './IexStatus';
import { AppBarTicker } from './AppBarTicker';
import {
  Burger,
  Home,
  Accounts,
  Watchlist,
  Goals,
  Logout,
  Crypto,
  Sparkle,
  Refresh,
  Chart,
} from './Icons';

export type NavStatusType = 'hidden' | 'flex';

const swipeConfig = {
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
};

export const Nav = ({
  status,
  onSwipedLeft,
  onItemClick,
}: {
  status: NavStatusType;
  onSwipedLeft: () => void;
  onItemClick: () => void;
}) => {
  const auth = useAuth();
  const handlers = useSwipeable({
    onSwipedLeft,
    ...swipeConfig,
  });
  return (
    <nav
      {...handlers}
      className={`${status} fixed md:flex top-0 left-0 min-h-screen border-r border-current shadow w-16`}
    >
      <ul className="mx-1 my-2">
        {links.map(({ href, label, icon }) => (
          <li key={`${href}${label}`} className="flex justify-center px-2 py-4">
            <Link href={href}>
              <a
                className=""
                onClick={
                  window.innerWidth < 641 ? () => onItemClick() : undefined
                }
              >
                {(() => {
                  switch (icon) {
                    case 'home':
                      return <Home />;
                    case 'accounts':
                      return <Accounts />;
                    case 'goals':
                      return <Goals />;
                    case 'watchlist':
                      return <Watchlist />;
                    case 'crypto':
                      return <Crypto />;
                    case 'kids':
                      return <Sparkle />;
                    case 'chart':
                      return <Chart />;
                    default:
                      return null;
                  }
                })()}
              </a>
            </Link>
          </li>
        ))}
        <li className="flex justify-center px-2 py-4">
          <button onClick={auth.logout}>
            <Logout />
          </button>
        </li>
      </ul>
    </nav>
  );
};

interface HeaderProps {
  status: NavStatusType;
  onClick: () => void;
}
export const Header = ({ onClick, status }: HeaderProps) => {
  const queryClient = useQueryClient();
  return (
    <div className={`${status === 'flex' ? 'ml-16' : 'ml-0'} md:ml-16`}>
      <AppBarTicker />
      <header className="flex justify-between items-center py-2 px-2 md:px-4">
        <h1 className="text-2xl hidden md:block">Sand Beach Capital</h1>
        <IexStatus />
        <div className="md:hidden">
          <button
            className="md:hidden mx-1"
            onClick={() => queryClient.refetchQueries()}
          >
            <Refresh />
          </button>
          <button className="md:hidden" onClick={onClick}>
            <Burger />
          </button>
        </div>
      </header>
    </div>
  );
};

interface ContainerProps {
  status: NavStatusType;
  children: React.ReactNode;
}

export const Container = ({ children, status }: ContainerProps) => {
  return (
    <div
      className={`${
        status === 'flex' ? 'ml-16' : 'ml-0'
      } md:ml-16 min-h-screen`}
    >
      <main className="container container-extended p-4 md:px-8 lg:px-20">
        {children}
      </main>
    </div>
  );
};
