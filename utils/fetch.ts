import axios from 'axios';

export const axiosGet = async <T>(url: string, token: string, params = {}): Promise<T> => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params
  });

  return data;
};
