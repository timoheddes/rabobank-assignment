import { count } from './../src/cli/count';

jest.mock('../src/utils', () => ({
  saveReport: jest.fn(),
  validateRecords: jest.fn(),
}));

jest.mock('../src/cli', () => jest.fn());

describe('count', () => {
  it('should append an "s" to the type if the count is greater than 1', () => {
    const result = count(5, 'record');
    expect(result).toContain('records');
  });

  it('should not append an "s" to the type if the count is 1', () => {
    const result = count(1, 'record');
    expect(result).not.toContain('records');
  });
});
