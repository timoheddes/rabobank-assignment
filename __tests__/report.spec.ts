import { Constants } from '../src/constants';
import type { ReportRecord } from '../src/types';
import {
  generateTimestamp,
  parseData,
  readFile,
  saveReport,
  stripRecords,
  validateRecords,
} from '../src/utils/';

describe('report', () => {
  let report: string;

  it('should create and save JSON report', async () => {
    const records = await readFile('./__tests__/data/records.csv');
    const parsedRecords = await parseData([records], 'csv');
    const validatedRecords = validateRecords(parsedRecords);

    report = saveReport(
      stripRecords(validatedRecords),
      'test-report',
      './reports',
    );

    expect(report).toEqual(
      JSON.stringify([
        {
          reference: 112806,
          description: 'Subscription from Dani�l Theu�',
          errors: [Constants.Records.Errors.duplicate],
        },
        {
          reference: 112806,
          description: 'Subscription for Rik Dekker',
          errors: [Constants.Records.Errors.duplicate],
        },
      ]),
    );
  });

  it('should only contain invalid records with one or more errors', () => {
    expect(
      JSON.parse(report).every(
        (record: ReportRecord) => record?.errors?.length !== 0,
      ),
    ).toBeTruthy();
  });
});

describe('generateTimestamp', () => {
  it('should return a timestamp in the correct format', () => {
    const result = generateTimestamp();
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/;
    expect(result).toMatch(regex);
  });
});
