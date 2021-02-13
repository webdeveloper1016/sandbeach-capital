import React from 'react';
import { Nav, NavStatusType, Header, Container } from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

// TODO: add react-swipable
const Layout = ({ children }: LayoutProps) => {
  const [menuStatus, setMenuStatus] = React.useState<NavStatusType>('hidden');

  const handleToggle = () => {
    setMenuStatus(menuStatus === 'hidden' ? 'flex' : 'hidden');
  };
  return (
    <div>
      <Nav status={menuStatus} />
      <Header status={menuStatus} onClick={handleToggle} />
      <Container status={menuStatus}>{children}</Container>
    </div>
  );
};

export default Layout;
