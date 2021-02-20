import React from 'react';

export interface TradingViewWrapperProps {
  src: 'embed-widget-ticker-tape' | 'embed-widget-mini-symbol-overview';
  config: Record<any, any>;
}

export const TradingViewWrapper = ({
  src,
  config,
}: TradingViewWrapperProps) => {
  const trRef = React.useRef(null);
  const [tickerMounted, setTickerMounted] = React.useState(false);

  React.useEffect(() => {
    setTickerMounted(true);
    if (tickerMounted) {
      return;
    }
    const script = document.createElement('script');
    script.src =
      `https://s3.tradingview.com/external-embedding/${src}.js`;
    script.async = true;
    script.innerHTML = JSON.stringify({
      ...config,
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'regular',
      locale: 'en',
    });
    trRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={trRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
