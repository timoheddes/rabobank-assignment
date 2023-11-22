import * as csv from 'csv-parser';
import type { DataFormat, RecordStructure } from 'src/types';
import { Readable } from 'stream';
import * as xml2js from 'xml2js';

async function parseCSV(data: string): Promise<RecordStructure[]> {
  const records: any[] = [];
  return new Promise((resolve, reject) => {
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
      );
  });
}

async function parseXML(data: string): Promise<any> {
  return new Promise((resolve, reject) => {
    xml2js.parseString(
      data,
      { explicitArray: false, mergeAttrs: true },
      (error: Error, result) => {
        if (error) reject(new Error('Error reading XML: ' + error.message));
        else {
          const parsedRecords: RecordStructure[] = [];
          result.records.record.forEach((record) => {
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
    );
  });
}

export async function parseData(data: string, format: DataFormat) {
  switch (format) {
    case 'csv':
      return parseCSV(data);
    case 'xml':
      return parseXML(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}
