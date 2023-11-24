import { Constants } from '../../constants';
import type { RecordStructure, ValidationProperties } from '../../types';

/**
 * Checks if the structure of a record is valid.
 * @param {RecordStructure} record - Record to validate.
 * @returns {boolean}
 */
export const isValidRecordStructure = ({
  reference,
  accountNumber,
  description,
  startBalance,
  mutation,
  endBalance,
}: RecordStructure): boolean => {
  const numbers = [reference, startBalance, mutation, endBalance];
  const strings = [accountNumber, description];

  return numbers.every((num) => !isNaN(num)) && strings.every((str) => str);
};

/**
 * Checks if a reference is unique.
 * @param {Set<number>} references - Set of existing references to check against.
 * @param {number} reference - Reference to check.
 * @returns {boolean}
 */
export const isUniqueReference = (
  references: Set<number>,
  reference: number,
): boolean => !references.has(reference);

/**
 * Checks if the end balance of a record is valid.
 * @param {RecordStructure} record - Record to validate.
 * @returns {boolean}
 */
export const isValidEndBalance = (record: RecordStructure): boolean =>
  Number((record.startBalance + record.mutation).toFixed(2)) ===
  Number(record.endBalance.toFixed(2));

/**
 * Validates an array of records.
 * @param {RecordStructure[]} records - Records to validate.
 * @returns {(RecordStructure & ValidationProperties)[]} - Returns a new array of records with added validation properties.
 */
export const validateRecords = (
  records: RecordStructure[],
): (RecordStructure & ValidationProperties)[] => {
  const references = new Set([]);
  const validatedRecords = records.map((record) => ({
    ...record,
    ...{
      valid: true,
      errors: [],
    },
  }));

  validatedRecords.forEach((record) => {
    if (!isUniqueReference(references, record.reference)) {
      record.errors.push(Constants.Records.Errors.duplicate);
    }
    if (!isValidEndBalance(record)) {
      record.errors.push(Constants.Records.Errors.incorrectEndBalance);
    }
    record.valid = record.errors.length === 0;
    references.add(record.reference);
  });

  return validatedRecords;
};
