import { PortfolioModel } from '../ts/types';

export const fetcher = (url) =>
  fetch(url).then((res) => res.json() as Promise<PortfolioModel>);
