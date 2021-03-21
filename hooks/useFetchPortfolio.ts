import { useQuery, UseQueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import { APIPortfolioModelResp, APIPortfolioModel } from '../ts';

/** Fetch and process the API data */
const useGetPortfolio = async (params: {
  account: string;
  token: string;
  logout: () => void;
}): Promise<APIPortfolioModel> => {
  try {
    const { data } = await axiosGet<APIPortfolioModelResp>(
      '/api/portfolio',
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
const useFetchPortfolio = (account = null): UseQueryResult<APIPortfolioModel> => {
  const auth = useAuth();
  return useQuery(['portfolio', { account }], () =>
    useGetPortfolio({ ...auth, account }),
  );
};

export default useFetchPortfolio;
