export type DataFormat = 'csv' | 'xml';
export type RecordStructure = {
  reference: number;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
};
