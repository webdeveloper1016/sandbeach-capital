import { TradingViewWrapper } from './TradingViewWrapper';

const src = 'embed-widget-ticker-tape';
const config = {
  symbols: [
    {
      proName: 'AMEX:SPY',
      title: 'SPY',
    },
    {
      proName: 'NASDAQ:QQQ',
      title: 'QQQ',
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
};
export const AppBarTicker = () => {
  return (
    <div>
      <TradingViewWrapper src={src} config={config} />
    </div>
  );
};
