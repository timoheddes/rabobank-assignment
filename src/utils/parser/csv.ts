import { Constants } from '@constants';
import type { RecordStructure } from '@types';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { isValidRecordStructure } from './';

const CSVHeaders = {
  reference: 'Reference',
  accountNumber: 'Account Number',
  description: 'Description',
  startBalance: 'Start Balance',
  mutation: 'Mutation',
  endBalance: 'End Balance',
};

/**
 * Parses CSV data into an array of records.
 * @param data - The CSV data to parse.
 * @returns A promise that resolves with an array of records.
 */
export const parseCSV = async (data: string[]): Promise<RecordStructure[]> => {
  const records: Array<Record<string, string>> = [];

  return new Promise((resolve, reject) =>
    Readable.from(data)
      .pipe(csv())
      .on('data', (data) => records.push(data))
      .on('end', () => {
        const parsedRecords: RecordStructure[] = records
          .map((record) => {
            const {
              [CSVHeaders.reference]: reference,
              [CSVHeaders.accountNumber]: accountNumber,
              [CSVHeaders.description]: description,
              [CSVHeaders.startBalance]: startBalance,
              [CSVHeaders.mutation]: mutation,
              [CSVHeaders.endBalance]: endBalance,
            } = record;

            return {
              reference: Number(reference),
              accountNumber,
              description,
              startBalance: Number(startBalance),
              mutation: Number(mutation),
              endBalance: Number(endBalance),
            };
          })
          .filter(isValidRecordStructure);

        if (parsedRecords.length === 0) {
          return reject(new Error(Constants.IO.Errors.file('CSV')));
        }

        resolve(parsedRecords);
      }),
  );
};
