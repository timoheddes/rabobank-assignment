import chalk from 'chalk';
import * as path from 'path';
import { Constants } from '../constants';
import type { DataFormat, RecordStructure } from '../types';
import { getFolderPath, parseData, readFolder } from '../utils';
import { count } from './';

/**
 * Scans a directory for CSV and XML files and reports the number of files and records found.
 * If no directory is specified, the current directory is scanned.
 * @param dir - The directory to scan. If not provided, the current directory is scanned.
 * @returns The parsed records, or null if no files were found.
 */
export const scanFolder = async (
  dir?: string,
): Promise<RecordStructure[] | null> => {
  try {
    const folder = dir ? getFolderPath(dir) : path.resolve('.');
    console.info(chalk.gray(`Scanning ${chalk.italic(folder)} ..`));

    const csvFiles = await readFolder('csv' as DataFormat, folder);
    const xmlFiles = await readFolder('xml' as DataFormat, folder);

    if (csvFiles.length === 0 && xmlFiles.length === 0) {
      console.warn(chalk.bold('\nNo files found.'));
      return null;
    }

    const csvRecords = await parseData(csvFiles, 'csv');
    const xmlRecords = await parseData(xmlFiles, 'xml');

    console.info(
      `\nFound ${count(csvFiles.length, 'CSV file')} and ${count(
        xmlFiles.length,
        'XML file',
      )} containing a combined total of ${count(
        csvRecords.length + xmlRecords.length,
        'record',
      )}.`,
    );

    return Promise.resolve([...csvRecords, ...xmlRecords]);
  } catch (err) {
    console.error(chalk.red(Constants.IO.Errors.folder, err));
    return null;
  }
};
