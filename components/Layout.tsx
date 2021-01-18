import { Nav, Header, Container } from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Nav />
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
