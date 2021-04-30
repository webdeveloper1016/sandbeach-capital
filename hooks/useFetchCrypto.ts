import { useQuery, UseQueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import { APICryptoModelResp, CMCEnrichedCryptoModel } from '../ts';

/** Fetch and process the API data */
const useGetCrypto = async (params: {
  token: string;
  logout: () => void;
}): Promise<CMCEnrichedCryptoModel> => {
  try {
    const { data } = await axiosGet<APICryptoModelResp>(
      '/api/crypto',
      params.token,
    );

    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        params.logout();
        return;
      }
    }

    throw new Error(error);
  }
};

/** React Query hook to get the data */
const useFetchCrypto = (): UseQueryResult<CMCEnrichedCryptoModel> => {
  const auth = useAuth();
  return useQuery('crypto', () => useGetCrypto(auth), {
    refetchInterval: 1000 * 60 * 5,
  });
};

export default useFetchCrypto;
