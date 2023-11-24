import { Constants } from '../src/constants';
import {
  isUniqueReference,
  isValidEndBalance,
  validateRecords,
} from '../src/utils';

describe('isUniqueReference', () => {
  it('should return true if the reference is unique', () => {
    const references = new Set<number>([146294, 112806, 112806]);
    const reference = 141007;
    expect(isUniqueReference(references, reference)).toBe(true);
  });

  it('should return false if the reference is not unique', () => {
    const references = new Set<number>([146294, 112806, 141007]);
    const reference = 112806;
    expect(isUniqueReference(references, reference)).toBe(false);
  });
});

describe('isValidEndBalance', () => {
  const record = {
    reference: 181688,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers for Jan Theuß',
    startBalance: 1,
    mutation: 1,
    endBalance: 2,
  };
  it('should return true if the end balance is valid', () => {
    expect(isValidEndBalance(record)).toBe(true);
  });

  it('should return false if the end balance is not valid', () => {
    record.endBalance = 3;
    expect(isValidEndBalance(record)).toBe(false);
  });

  it('should correctly handle negative balances', () => {
    record.startBalance = -9.2;
    record.mutation = 4;
    record.endBalance = -5.2;
    expect(isValidEndBalance(record)).toBe(true);
  });

  it('should be inclusive towards billionaires...', () => {
    record.startBalance = 123043311005;
    record.mutation = -2350003;
    record.endBalance = 123040961002;
    expect(isValidEndBalance(record)).toBe(true);
  });

  it('and also to those with large debt..', () => {
    record.startBalance = -230052;
    record.mutation = +5000;
    record.endBalance = -225052;
    expect(isValidEndBalance(record)).toBe(true);
  });
});

describe('validateRecords', () => {
  it('should flag records with duplicate references', async () => {
    const records = [
      {
        reference: 112806,
        accountNumber: 'NL43AEGO0773393871',
        description: 'Subscription from Dani�l Theu�',
        startBalance: 1,
        mutation: 1,
        endBalance: 2,
      },
      {
        reference: 112806,
        accountNumber: 'NL74ABNA0248990274',
        description: 'Subscription for Rik Dekker',
        startBalance: 1,
        mutation: 1,
        endBalance: 2,
      },
    ];

    const result = validateRecords(records);

    expect(result).toEqual([
      {
        ...records[0],
        ...{ valid: true, errors: [] },
      },
      {
        ...records[1],
        ...{ valid: false, errors: [Constants.Records.Errors.duplicate] },
      },
    ]);
  });

  it('should flag records with invalid end balances', async () => {
    const invalidRecords = [
      {
        reference: 146294,
        accountNumber: 'NL90ABNA0585647886',
        description: 'Tickets for Vincent Dekker',
        startBalance: 1,
        mutation: 1,
        endBalance: 3,
      },
    ];

    expect(validateRecords(invalidRecords)).toEqual([
      {
        ...invalidRecords[0],
        ...{
          valid: false,
          errors: [Constants.Records.Errors.incorrectEndBalance],
        },
      },
    ]);
  });
});
