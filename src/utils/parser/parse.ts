import type { DataFormat } from 'src/types';
import { parseCSV } from './csv';
import { parseXML } from './xml';

/**
 * Parses data in either CSV or XML format into an array of records.
 * @param {string[]} data - The data to parse.
 * @param {DataFormat} format - The format of the data ('csv' or 'xml').
 * @param {boolean} validOnly - If true, only valid records will be included in the output. Defaults to true.
 * @returns {Promise<RecordStructure[]>} - A promise that resolves with an array of records.
 */
export async function parseData(
  data: string[],
  format: DataFormat,
  validOnly: boolean = true,
) {
  switch (format) {
    case 'csv':
      return parseCSV(data, validOnly);
    case 'xml':
      return parseXML(data, validOnly);
  }
}
