import Nav from './Nav';

const Layout = ({children}) => {
  return (
    <div>
      <Nav />
      <div className="container px-10 py-5">{children}</div>
    </div>
  );
};

export default Layout;