import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Portfolio Manager</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Nav />
      <div className="container p-4 md:p-8 container-extended">{children}</div>
    </div>
  );
};

export default Layout;
