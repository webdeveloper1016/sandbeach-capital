import { useQuery, UseQueryResult } from 'react-query';
import useAuth from '../hooks/useAuth';
import { axiosGet } from '../utils/fetch';
import { APIPortfolioModelResp, APIPortfolioModel } from '../ts';

/** Fetch and process the API data */
const useGetPortfolio = async (params: {
  token: string;
  logout: () => void;
}): Promise<APIPortfolioModel> => {
  try {
    const { data } = await axiosGet<APIPortfolioModelResp>(
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
const useFetchPortfolio = (): UseQueryResult<APIPortfolioModel> => {
  const auth = useAuth();
  return useQuery(['portfolio'], () => useGetPortfolio(auth));
};

export default useFetchPortfolio;
