import { useQuery, QueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import {
  APIAccountModelResp,
  APIAccountModel,
  AirTableStockAccounts,
} from '../ts';

/** Fetch and process the API data */
const useGetAccount = async (params: {
  account: AirTableStockAccounts;
  token: string;
  logout: () => void;
}): Promise<APIAccountModel> => {
  console.log(params.account);
  try {
    const { data } = await axiosGet<APIAccountModelResp>(
      '/api/portfolio',
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
const useFetchAccount = (
  account: AirTableStockAccounts,
): QueryResult<APIAccountModel> => {
  const auth = useAuth();
  return useQuery(
    ['account', { account }],
    () => useGetAccount({ ...auth, account }),
    {
      refetchInterval: 1000 * 60,
    },
  );
};

export default useFetchAccount;
