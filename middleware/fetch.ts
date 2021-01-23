import axios from 'axios';
import { CoinCapAssetRespModel, CoinCapAssetModel } from '../ts/coincap';

// https://docs.coincap.io/#89deffa0-ab03-4e0a-8d92-637a857d2c91
export const fetchCoincap = async (
  ids: string[],
): Promise<CoinCapAssetModel[]> => {
  const { data } = await axios.get<CoinCapAssetRespModel>(
    `${process.env.COINCAP_API_URL}/assets`,
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
