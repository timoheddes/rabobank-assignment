import { Constants } from '@constants';
import type { RecordStructure } from '@types';
import { isValidRecordStructure } from '@utils';
import * as xml2js from 'xml2js';

/**
 * Parses XML data into an array of records.
 * @param data - The XML data to parse.
 * @returns A promise that resolves with an array of records.
 */
export const parseXML = async (data: string[]): Promise<RecordStructure[]> =>
  new Promise((resolve, reject) =>
    xml2js.parseString(
      data,
      { explicitArray: false, mergeAttrs: true },
      (err: Error | null, result) => {
        if (err || !Array.isArray(result.records.record)) {
          return reject(new Error(Constants.IO.Errors.file('XML')));
        }

        const parsedRecords: RecordStructure[] = result.records.record
          .map(
            ({
              reference,
              accountNumber,
              description,
              startBalance,
              mutation,
              endBalance,
            }: RecordStructure) => ({
              reference: Number(reference),
              accountNumber,
              description,
              startBalance: Number(startBalance),
              mutation: Number(mutation),
              endBalance: Number(endBalance),
            }),
          )
          .filter(isValidRecordStructure);

        resolve(parsedRecords);
      },
    ),
  );
