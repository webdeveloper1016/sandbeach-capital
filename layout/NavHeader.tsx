import { useQueryClient } from 'react-query';
import { IexStatus } from '../components/IexStatus';
import { Burger, Refresh } from '../components/Icons';
import { SidebarStatusType } from './Sidebar';

interface NavHeaderProps {
  status: SidebarStatusType;
  children: React.ReactNode;
  onClick: () => void;
}

export const NavHeader = ({ onClick, status, children }: NavHeaderProps) => {
  const queryClient = useQueryClient();
  console.log(status)
  return (
    <div className={`${status === 'flex' ? 'ml-16' : 'ml-0'} md:ml-16`}>
      <div>{children}</div>
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
