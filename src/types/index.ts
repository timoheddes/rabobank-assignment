export type DataFormat = 'csv' | 'xml';

export type Reference = number;
export type AccountNumber = string;
export type Description = string;
export type StartBalance = number;
export type Mutation = number;
export type EndBalance = number;

export type RecordStructure = {
  reference: Reference;
  accountNumber: AccountNumber;
  description: Description;
  startBalance: StartBalance;
  mutation: Mutation;
  endBalance: EndBalance;
};

export type ValidatedRecord = RecordStructure & ValidationProperties;

export type ReportRecord = {
  reference: Reference;
  description: Description;
  errors: string[];
};

export type ValidationProperties = { valid: boolean; errors: string[] };
