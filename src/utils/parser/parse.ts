import type { DataFormat, RecordStructure } from '../../types';
import { parseCSV } from './csv';
import { parseXML } from './xml';

/**
 * Parses data in either CSV or XML format into an array of records.
 * @param {string[]} data - The data to parse.
 * @param {DataFormat} format - The format of the data ('csv' or 'xml').
 * @returns {Promise<RecordStructure[]>} - A promise that resolves with an array of records.
 */
export async function parseData(
  data: string[],
  format: DataFormat,
): Promise<RecordStructure[]> {
  switch (format) {
    case 'csv':
      return parseCSV(data);
    case 'xml':
      return parseXML(data);
  }
}
