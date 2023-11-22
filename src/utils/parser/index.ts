import type { DataFormat } from 'src/types';
import { parseCSV } from './csv';
import { parseXML } from './xml';

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
