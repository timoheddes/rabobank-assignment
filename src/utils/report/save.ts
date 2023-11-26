import * as fs from 'fs';
import * as path from 'path';
import type { ValidatedRecord } from '../../types';

export const generateTimestamp = (): string => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-');
  return timestamp;
};

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

export const saveReport = (
  records: ValidatedRecord[],
  filename?: string | undefined,
  dir?: string | undefined,
): string => {
  const report = stripRecords(records);

  const reportDir = dir ? dir : './';
  fs.mkdirSync(reportDir, { recursive: true });

  fs.writeFileSync(
    path.join(
      reportDir,
      `${filename ? filename : `report-${generateTimestamp()}`}.json`,
    ),
    JSON.stringify(report, null, 2),
  );

  return JSON.stringify(report);
};
