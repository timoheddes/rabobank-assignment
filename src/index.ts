#! /usr/bin/env node

import chalk from 'chalk';
import * as path from 'path';

import { Command } from 'commander';
import figlet from 'figlet';
import { Constants } from './constants';
import type { DataFormat, RecordStructure } from './types';
import {
  generateTimestamp,
  getFolderPath,
  parseData,
  readFolder,
  saveReport,
  validateRecords,
} from './utils';

const log = console.log;
const info = console.info;
const warn = console.warn;
const error = console.error;

const count = (count: number, type: string) =>
  `${chalk.bold(chalk.yellow(count) + ` ${type}` + (count > 1 ? 's' : ''))}`;

const program = new Command();
program
  .version('0.0.1')
  .description('Rabobank Customer Statement Processor')
  .option(
    '-l, --ls [folder]',
    'List files and records in folder (folder optional, defaults to current folder)',
  )
  .option(
    '-r, --report [filename]',
    'Create report (filename optional, defaults to report-timestamp)',
  )
  .option('-h, --help')
  .parse(process.argv);

const options = program.opts();

const scanFolder = async (dir?: string): Promise<RecordStructure[] | null> => {
  try {
    const folder = dir ? getFolderPath(dir) : path.resolve('.');
    info(chalk.gray(`Scanning ${chalk.italic(folder)} ..`));

    const csvFiles = await readFolder('csv' as DataFormat, folder);
    const xmlFiles = await readFolder('xml' as DataFormat, folder);

    if (csvFiles.length === 0 && xmlFiles.length === 0) {
      warn(chalk.bold('\nNo files found.'));
      return null;
    }

    const csvRecords = await parseData(csvFiles, 'csv');
    const xmlRecords = await parseData(xmlFiles, 'xml');

    info(
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
    error(chalk.red(Constants.IO.Errors.folder, err));
    return null;
  }
};

const createReport = async (file: string) => {
  log(figlet.textSync('Rabobank'));

  const records = await scanFolder();
  if (records) {
    const validatedRecords = validateRecords(records);
    const report = saveReport(validatedRecords, file);
    info(
      `\nCreated report ${chalk.bold(
        `${chalk.italic(file)}.json`,
      )} containing ${count(JSON.parse(report).length, 'record')}.`,
    );
  }
};

// List files and records in folder if --l(s) option is passed
if (options.ls) {
  const filepath = typeof options.ls === 'string' ? options.ls : undefined;
  scanFolder(filepath);
}

// Show help
if (options.help) {
  program.outputHelp();
}

// Create report
if (options.report) {
  const filename =
    typeof options.report === 'string'
      ? `${options.report}`
      : `report-${generateTimestamp()}`;
  createReport(filename);
}
