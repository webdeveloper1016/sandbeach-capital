import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Nav, NavStatusType, Header, Container } from './Nav';

const queryClient = new QueryClient();
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuStatus, setMenuStatus] = React.useState<NavStatusType>('hidden');
  const handleToggle = () => {
    setMenuStatus(menuStatus === 'hidden' ? 'flex' : 'hidden');
  };
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Nav
          status={menuStatus}
          onSwipedLeft={() => setMenuStatus('hidden')}
          onItemClick={() => setMenuStatus('hidden')}
        />
        <Header status={menuStatus} onClick={handleToggle} />
        <Container
          status={menuStatus}
          onSwipedLeft={() => setMenuStatus('hidden')}
          onSwipedRight={() => setMenuStatus('flex')}
        >
          {children}
        </Container>
      </QueryClientProvider>
    </div>
  );
};

export default Layout;
