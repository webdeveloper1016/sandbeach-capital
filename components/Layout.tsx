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
      <div className="container px-10 py-5">{children}</div>
    </div>
  );
};

export default Layout;
