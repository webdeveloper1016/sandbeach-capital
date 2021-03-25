import { TradingViewWrapper } from '../components/TradingViewWrapper';

const src = 'embed-widget-ticker-tape';
const config = {
  symbols: [
    {
      proName: 'AMEX:VT',
      title: 'VT',
    },
    {
      proName: 'NASDAQ:QQQ',
      title: 'QQQ',
    },
    {
      proName: 'BITSTAMP:BTCUSD',
      title: 'BTC/USD',
    },
    {
      proName: 'AMEX:ARKK',
      title: 'ARKK',
    },
    {
      proName: 'NYSE:SQ',
      title: 'SQ',
    },
    {
      proName: 'NASDAQ:CRWD',
      title: 'CRWD',
    },
    {
      proName: 'NYSE:NET',
      title: 'NET',
    },
  ],
};
export const AppBarTicker = () => {
  return (
    <div className="border-b border-t border-current shadow">
      <TradingViewWrapper src={src} config={config} />
    </div>
  );
};
