import { AirTablePieModel, IexDetailedQuoteModel } from '../ts';

export const enrichDetailedQuotes = (
  pies: AirTablePieModel[],
  quotes: IexDetailedQuoteModel,
) => {
  return {
    pies,
    quotes,
  };
};
