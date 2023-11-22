import type { RecordStructure } from 'src/types';
import * as xml2js from 'xml2js';

export const parseXML = async (data: string): Promise<RecordStructure[]> =>
  new Promise((resolve, reject) =>
    xml2js.parseString(
      data,
      { explicitArray: false, mergeAttrs: true },
      (error: Error, result) => {
        if (error) reject(new Error('Error reading XML: ' + error.message));
        else {
          const parsedRecords: RecordStructure[] = [];
          result?.records?.record.forEach((record) => {
            const parsedRecord: RecordStructure = {
              reference: parseInt(record.reference),
              accountNumber: record.accountNumber,
              description: record.description,
              startBalance: parseFloat(record.startBalance),
              mutation: parseFloat(record.mutation),
              endBalance: parseFloat(record.endBalance),
            };
            parsedRecords.push(parsedRecord);
          });
          resolve(parsedRecords);
        }
      },
    ),
  );
