// import Head from 'next/head';
import '../styles/index.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from '../layout/Head';
import { AuthProvider } from '../components/Auth';
import Layout from '../layout/Layout';
import ErrorBoundary from '../layout/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head />
      <AuthProvider>
        <ErrorBoundary>
          <Layout>
            <ReactQueryDevtools />
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
