import type { RecordStructure } from 'src/types';
import * as xml2js from 'xml2js';
import { isValidRecord } from './validity';

export const parseXML = async (data: string[]): Promise<RecordStructure[]> =>
  new Promise((resolve, reject) =>
    xml2js.parseString(
      data,
      { explicitArray: false, mergeAttrs: true },
      (error: Error, result) => {
        if (error) reject(new Error(`Error reading XML: ${error.message}`));
        else {
          const parsedRecords: RecordStructure[] = result?.records?.record
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
            .filter(isValidRecord);

          resolve(parsedRecords);
        }
      },
    ),
  );
