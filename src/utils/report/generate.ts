import type { ValidatedRecord } from '../../types';

export const generateReport = (input: ValidatedRecord[]): string => {
  const report = input
    .filter((record) => !record.valid)
    .map(({ reference, description, errors }) => ({
      reference,
      description,
      errors,
    }));
  return JSON.stringify(report);
};
