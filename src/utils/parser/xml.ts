import * as xml2js from 'xml2js';
import { Constants } from '../../constants';
import type { RecordStructure } from '../../types';
import { isValidRecordStructure } from './validity';

/**
 * Parses XML data into an array of records.
 * @param {string[]} data - The XML data to parse.
 * @returns {Promise<RecordStructure[]>} - A promise that resolves with an array of records.
 */
export const parseXML = async (data: string[]): Promise<RecordStructure[]> =>
  new Promise((resolve, reject) =>
    xml2js.parseString(
      data,
      { explicitArray: false, mergeAttrs: true },
      (error: Error, result) => {
        if (error || !Array.isArray(result.records.record)) {
          return reject(new Error(Constants.Errors.file('XML')));
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
            }) => ({
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
