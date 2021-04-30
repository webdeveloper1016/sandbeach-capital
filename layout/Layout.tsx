import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from './Container';
import { Sidebar, SidebarStatusType } from './Sidebar';
import { NavHeader } from './NavHeader';
import { AppBarTicker } from './AppBarTicker';
import { Banner } from './Banner';

const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuStatus, setMenuStatus] = React.useState<SidebarStatusType>(
    'hidden',
  );

  const handleToggle = () => {
    setMenuStatus(menuStatus === 'hidden' ? 'flex' : 'hidden');
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Sidebar
          status={menuStatus}
          onSwipedLeft={() => setMenuStatus('hidden')}
          onItemClick={() => setMenuStatus('hidden')}
        />

        <NavHeader status={menuStatus} onClick={handleToggle}>
          <div>
            <Banner hide/>
            <AppBarTicker />
          </div>
        </NavHeader>
        <Container status={menuStatus}>{children}</Container>
      </QueryClientProvider>
    </div>
  );
};

export default Layout;
