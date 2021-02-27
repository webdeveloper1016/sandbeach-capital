import { TradingViewWrapper } from './TradingViewWrapper';

const src = 'embed-widget-ticker-tape';
const config = {
  symbols: [
    {
      proName: 'AMEX:IVV',
      title: 'IVV',
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
      proName: 'NASDAQ:TSLA',
      title: 'TSLA',
    },
    {
      proName: 'AMEX:IEFA',
      title: 'IEFA',
    },
    {
      proName: 'AMEX:IMTB',
      title: '10YR',
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
    <div className="border-b border-current shadow">
      <TradingViewWrapper src={src} config={config} />
    </div>
  );
};
