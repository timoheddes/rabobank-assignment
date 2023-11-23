import { RecordStructure } from '../../types';

export const isValidRecord = ({
  reference,
  accountNumber,
  description,
  startBalance,
  mutation,
  endBalance,
}: RecordStructure): boolean => {
  const numbers = [reference, startBalance, mutation, endBalance];
  const strings = [accountNumber, description];

  return (
    numbers.every((num) => typeof num === 'number' && !isNaN(num)) &&
    strings.every((str) => typeof str === 'string' && str)
  );
};
