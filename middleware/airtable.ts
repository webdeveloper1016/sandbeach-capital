import AirtableConnect from 'airtable';
import { AirTableTablesType } from '../ts';

const base = new AirtableConnect({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE,
);

export const airtable = <T>(table: AirTableTablesType): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      base(table)
        .select({
          view: 'Grid view',
        })
        .firstPage(async (err, records) => {
          // check for err
          if (err) {
            reject(err);
          }

          // process data
          const data = records.map((r) => r.fields);

          resolve((data as unknown) as T);
        });
    } catch (error) {
      reject(error);
    }
  });
};
