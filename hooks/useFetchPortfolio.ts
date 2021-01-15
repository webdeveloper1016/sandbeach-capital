import { useQuery, QueryResult } from 'react-query';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';
import { runAnalysis } from '../utils';
import { fetcher, fetchQuotes } from '../utils/fetch';
import { extractTickers } from '../utils/quotes';
import { PortfolioModelExtended } from '../ts/types';

/** Fetch and process the API data */
const useGetPortfolio = async (params: {
  token: string;
  logout: () => void;
}): Promise<PortfolioModelExtended> => {
  try {
    const { data, iex } = await fetcher('/api/portfolio', params.token);
    const tickers = extractTickers(data);
    const quotes = await fetchQuotes(tickers, iex);
    return { ...runAnalysis(data, quotes), iex, quotes };
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
const useFetchPortfolio = (): QueryResult<PortfolioModelExtended> => {
  const auth = useAuth();
  return useQuery(['portfolio'], () => useGetPortfolio(auth), {
    refetchInterval: 1000 * 60,
  });
};

export default useFetchPortfolio;
