import React from 'react';

export const AppBarTicker = () => {
  const trRef = React.useRef(null);
  const [tickerMounted, setTickerMounted] = React.useState(false);

  React.useEffect(() => {
    setTickerMounted(true);
    if (tickerMounted) {
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'AMEX:SPY',
          title: 'S&P 500',
        },
        {
          proName: 'NASDAQ:QQQ',
          title: 'Nasdaq 100',
        },
        {
          proName: 'AMEX:ARKK',
          title: 'ARKK',
        },
        {
          proName: 'BITSTAMP:BTCUSD',
          title: 'BTC/USD',
        },
        {
          proName: 'BITSTAMP:ETHUSD',
          title: 'ETH/USD',
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'regular',
      locale: 'en',
    });
    trRef.current.appendChild(script);
  }, []);
  return (
    <div>
      <div className="tradingview-widget-container" ref={trRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};
