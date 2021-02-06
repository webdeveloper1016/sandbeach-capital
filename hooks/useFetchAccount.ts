import { useQuery, QueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import {
  APIPortfolioModelResp,
  APIAccountModelResp,
  EnrichedDetailedQuoteModel,
  AirTableAccountRoutes,
} from '../ts';

/** Fetch and process the API data */
const useGetAccount = async (params: {
  account: AirTableAccountRoutes;
  token: string;
  logout: () => void;
}): Promise<EnrichedDetailedQuoteModel> => {
  try {
    if (!params.account) {
      return null
    }
    const { data } = await axiosGet<APIAccountModelResp>(
      '/api/account',
      params.token,
      { account: params.account },
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
  account: AirTableAccountRoutes,
): QueryResult<EnrichedDetailedQuoteModel> => {
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
