import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { Constants } from '../../constants';
import type { RecordStructure } from '../../types';
import { isValidRecordStructure } from './validity';

const headers = {
  reference: 'Reference',
  accountNumber: 'Account Number',
  description: 'Description',
  startBalance: 'Start Balance',
  mutation: 'Mutation',
  endBalance: 'End Balance',
};

/**
 * Parses CSV data into an array of records.
 * @param {string[]} data - The CSV data to parse.
 * @returns {Promise<RecordStructure[]>} - A promise that resolves with an array of records.
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
              [headers.reference]: reference,
              [headers.accountNumber]: accountNumber,
              [headers.description]: description,
              [headers.startBalance]: startBalance,
              [headers.mutation]: mutation,
              [headers.endBalance]: endBalance,
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
          return reject(new Error(Constants.Errors.file('CSV')));
        }

        resolve(parsedRecords);
      }),
  );
};
