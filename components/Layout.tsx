import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Sand Beach Capital</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Nav />
      <div className="container p-4 md:px-8 lg:px-20 container-extended">{children}</div>
    </div>
  );
};

export default Layout;
