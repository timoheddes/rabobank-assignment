#! /usr/bin/env node

import { Command } from 'commander';
import { createReport, scanFolder } from './cli';
import { generateTimestamp } from './utils';

const program = new Command();
program
  .version('0.1.2')
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

// Show help
if (options.help || !process.argv.slice(2).length) {
  program.outputHelp();
}

// List files and records in folder if --l(s) option is passed
if (options.ls) {
  const filepath = typeof options.ls === 'string' ? options.ls : undefined;
  scanFolder(filepath);
}

// Create report
if (options.report || !process.argv.slice(2).length) {
  const filename =
    typeof options.report === 'string'
      ? `${options.report}`
      : `report-${generateTimestamp()}`;
  createReport(filename);
}
