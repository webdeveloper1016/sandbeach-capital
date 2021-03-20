import _ from 'lodash';
import AirtableConnect from 'airtable';
import {
  AirTableAccountModel,
  AirTablePieModel,
  AirTableTablesType,
  AirTableCryptoModel,
  AirTableAllTables
} from '../ts';

const base = new AirtableConnect({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE,
);

export const airtable = <T>(
  table: AirTableTablesType,
  formula = '',
): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      base(table)
        .select({
          view: 'Grid view',
          filterByFormula: formula,
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

export const airtablePaged = <T>(
  table: AirTableTablesType,
  formula = '',
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    let collectedData: T[] = [];
    try {
      base(table)
        .select({
          view: 'Grid view',
          filterByFormula: formula,
        })
        .eachPage(
          (records, nextPage) => {
            // process data
            const data = records.map((r) => r.fields);
            collectedData = [...collectedData, data] as T[];
            nextPage();
          },
          (err) => {
            if (err) {
              reject(err);
            }
            resolve(_.flatten(collectedData));
          },
        );
    } catch (error) {
      reject(error);
    }
  });
};

export const airtableAll = async (): Promise<AirTableAllTables> => {
  const data = await Promise.all([
    airtable<AirTableAccountModel[]>('Accounts'),
    airtable<AirTableCryptoModel[]>('Crypto'),
    airtablePaged<AirTablePieModel>('Pies'),
  ]);

  return {
    accounts: data[0],
    crypto: data[1],
    pies: data[2],
  };
};
