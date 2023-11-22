import * as csv from 'csv-parser';
import type { RecordStructure } from 'src/types';
import { Readable } from 'stream';

export const parseCSV = async (data: string): Promise<RecordStructure[]> => {
  const records: any[] = [];

  return new Promise((resolve, reject) =>
    Readable.from(data)
      .pipe(csv())
      .on('data', (data) => records.push(data))
      .on('end', () => {
        const parsedRecords: RecordStructure[] = [];
        records.forEach((record) => {
          const parsedRecord: RecordStructure = {
            reference: parseInt(record.Reference),
            accountNumber: record['Account Number'],
            description: record.Description,
            startBalance: parseFloat(record['Start Balance']),
            mutation: parseFloat(record.Mutation),
            endBalance: parseFloat(record['End Balance']),
          };
          parsedRecords.push(parsedRecord);
        });
        resolve(parsedRecords);
      })
      .on('error', (error) =>
        reject(new Error('Error reading CSV: ' + error.message)),
      ),
  );
};
