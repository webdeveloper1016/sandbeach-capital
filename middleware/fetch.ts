import axios from 'axios';
import { CoinCapAssetRespModel, CoinCapAssetModel } from '../ts/coincap';

export const fetchCoincap = async (
  ids: string[],
): Promise<CoinCapAssetModel[]> => {
  console.log(ids);
  const { data } = await axios.get<CoinCapAssetRespModel>(
    'https://api.coincap.io/v2/assets',
    {
      params: {
        ids: ids.join(','),
      },
    },
  );

  return data.data.map((i) => ({
    ...i,
    priceUsdNumber: Number(i.priceUsd),
  }));
};
