import * as fs from 'fs';
import * as path from 'path';
import type { RecordStructure, ValidatedRecord } from '../../types';

/**
 * Generates a timestamp with colons and periods replaced by hyphens.
 * @returns The timestamp.
 */
export const generateTimestamp = (): string => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-');
  return timestamp;
};

/**
 * Creates a new array of records, each containing only the reference, description, and errors, and only includes records that are invalid.
 * @param records The records to strip.
 * @returns The stripped records.
 */
export const stripRecords = (
  records: ValidatedRecord[],
): Partial<ValidatedRecord>[] =>
  records
    .filter((record) => !record.valid)
    .map(({ reference, description, errors }) => ({
      reference,
      description,
      errors,
    }));

/**
 * Writes the records to a report file. Filename and directory can be specified. If not, the filename will be 'report-{timestamp}.json' and the directory will be the current directory.
 * @param records The records to save in the report.
 * @param filename The name of the file to save the report to.
 * @param dir The directory to save the report in.
 * @returns The JSON string of the report.
 */
export const saveReport = (
  records: Partial<RecordStructure>[],
  filename?: string | undefined,
  dir?: string | undefined,
): string => {
  const reportDir = dir ? dir : './';
  fs.mkdirSync(reportDir, { recursive: true });

  fs.writeFileSync(
    path.join(
      reportDir,
      `${filename ? filename : `report-${generateTimestamp()}`}.json`,
    ),
    JSON.stringify(records, null, 2),
  );

  return JSON.stringify(records);
};
