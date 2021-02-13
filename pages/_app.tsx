// import Head from 'next/head';
import '../styles/index.css';
import Head from '../components/Head';
import { AuthProvider } from '../components/Auth';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head />
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
