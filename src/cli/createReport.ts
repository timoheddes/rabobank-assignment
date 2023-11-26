import chalk from 'chalk';
import figlet from 'figlet';

import { saveReport, validateRecords } from '../utils';
import { count } from './count';
import { scanFolder } from './scanFolder';

/**
 * Creates a report from the records in a JSON file.
 * @param file - The name of the file to save the report to.
 */
export const createReport = async (file: string) => {
  console.log(figlet.textSync('Rabobank'));

  const records = await scanFolder();
  if (records) {
    const validatedRecords = validateRecords(records);
    const report = saveReport(validatedRecords, file);
    console.info(
      `\nCreated report ${chalk.bold(
        `${chalk.italic(file)}.json`,
      )} containing ${count(JSON.parse(report).length, 'record')}.`,
    );
  }
};
