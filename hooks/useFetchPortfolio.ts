import { useQuery, QueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import { APIAccountModelResp, APIAccountModel } from '../ts';

/** Fetch and process the API data */
const useGetPortfolio = async (params: {
  token: string;
  logout: () => void;
}): Promise<APIAccountModel> => {
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
const useFetchPortfolio = (): QueryResult<APIAccountModel> => {
  const auth = useAuth();
  return useQuery(['portfolio'], () => useGetPortfolio(auth), {
    refetchInterval: 1000 * 60,
  });
};

export default useFetchPortfolio;
