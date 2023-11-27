import chalk from 'chalk';
import figlet from 'figlet';

import { saveReport, stripRecords, validateRecords } from '../utils';
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
    const failedTransactions = stripRecords(validatedRecords);
    if (failedTransactions.length === 0) {
      return console.info(chalk.bold('No failed transactions found.'));
    }
    saveReport(failedTransactions, file);
    console.info(
      `\n${count(
        failedTransactions.length,
        'record',
      )} failed validation: ${chalk.blueBright(
        chalk.bold(`${chalk.italic(file)}.json`),
      )}`,
    );
  }
};
