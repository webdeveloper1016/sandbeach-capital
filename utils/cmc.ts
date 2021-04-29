import { currencyDisplay, numberDisplay, percDisplayWithClass } from './calc';
import { CoinMarketCapRespModel, CoinMarketCapAssetModel } from '../ts';

export const formatCoinMarketCap = (
  data: CoinMarketCapRespModel,
): CoinMarketCapAssetModel[] => {
  return Object.keys(data.data).map((i) => {
    const coin = data.data[i];
    const quote = coin.quote.USD;

    return {
      ...coin,
      symbolName: {
        symbol: coin.symbol,
        name: coin.name,
        urls: {
          coincap: `https://coincap.io/assets/${coin.slug}`,
          messari: `https://messari.io/asset/${coin.slug}`,
          cmc: `https://coinmarketcap.com/currencies/${coin.slug}`,
        },
      },
      rank: coin.cmc_rank,
      priceDisplay: currencyDisplay(quote.price),
      marketCapDisplay: numberDisplay(quote.market_cap),
      volumeDisplay: numberDisplay(quote.volume_24h),
      changePercent: percDisplayWithClass(quote.percent_change_24h, 100, true),
      changePercentWeek: percDisplayWithClass(quote.percent_change_7d, 100, true),
      changePercentMo: percDisplayWithClass(quote.percent_change_30d, 100, true),
      changePercentThreeMo: percDisplayWithClass(quote.percent_change_90d, 100, true),
      supplyDisplay: coin.max_supply
        ? numberDisplay(coin.max_supply)
        : { val: 0, display: '∞' },
    };
  });
};
