import React from 'react';

export const AppBarTicker = () => {
  const trRef = React.useRef(null);

  React.useEffect(() => {
    console.log(trRef.current)
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'FOREXCOM:SPXUSD',
          title: 'S&P 500',
        },
        {
          proName: 'FOREXCOM:NSXUSD',
          title: 'Nasdaq 100',
        },
        {
          proName: 'FX_IDC:EURUSD',
          title: 'EUR/USD',
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
      displayMode: 'adaptive',
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
