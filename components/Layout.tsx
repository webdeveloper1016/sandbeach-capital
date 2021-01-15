import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="container p-4 md:px-8 lg:px-20 container-extended">
        {children}
      </div>
    </div>
  );
};

export default Layout;
