import NextHead from 'next/head';

const Head = (): React.ReactElement => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
    <meta name="description" content="A comprehensive view of your portfolio" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="SB Cap" />
    <meta name="theme-color" content="#10b981" />
    <title>Sand Beach Capital</title>
    <link rel="shortcut icon" href="/favicon.png" />
    <link rel="manifest" href="/manifest.json" />
    <link
      href="/icons/favicon-16x16.png"
      rel="icon"
      type="image/png"
      sizes="16x16"
    />
    <link
      href="/icons/favicon-32x32.png"
      rel="icon"
      type="image/png"
      sizes="32x32"
    />
    <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
  </NextHead>
);

export default Head;
