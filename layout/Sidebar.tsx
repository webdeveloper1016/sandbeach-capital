import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import useAuth from '../hooks/useAuth';
import { links } from '../routes';
import {
  Home,
  Accounts,
  Watchlist,
  Goals,
  Logout,
  Crypto,
  Sparkle,
  Chart,
} from '../components/Icons';

export type SidebarStatusType = 'hidden' | 'flex';

const swipeConfig = {
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
};

export const MimicSidebar = () => (
  <div className="fixed md:flex top-0 left-0 min-h-screen border-r border-current shadow w-16 md:ml-16" />
);

export const Sidebar = ({
  status,
  onSwipedLeft,
  onItemClick,
}: {
  status: SidebarStatusType;
  onSwipedLeft: () => void;
  onItemClick: () => void;
}) => {
  const auth = useAuth();
  const handlers = useSwipeable({
    onSwipedLeft,
    ...swipeConfig,
  });
  console.log(status);
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
