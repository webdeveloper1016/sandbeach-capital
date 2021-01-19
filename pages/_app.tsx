import Head from 'next/head';
import '../styles/index.css';
import { AuthProvider } from '../components/Auth';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Sand Beach Capital</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
