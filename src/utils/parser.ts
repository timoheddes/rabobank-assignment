import * as csv from 'csv-parser';
import * as xml2js from 'xml2js';
import { Readable } from 'stream';

export type DataFormat = 'csv' | 'xml';

async function parseCSV(data: string): Promise<any> {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    Readable.from(data)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function parseXML(data: string): Promise<any> {
  return new Promise((resolve, reject) => {
    xml2js.parseString(data, (error: unknown, result: JSON) => {
      if (error) reject(error);
      else resolve(result);
    });
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
