import { isValidRecordStructure, parseData, readFiles } from '../src/utils';

describe('process', () => {
  test('should read and parse all CSV files in the data folder', async () => {
    const content = await readFiles('csv');
    if (content.length === 0) {
      throw new Error('❗ no CSV files found in data folder..');
    }
    expect(content).not.toEqual([]);

    const parsed = await parseData(content, 'csv');
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed).not.toEqual([]);

    parsed.map((record) => {
      expect(isValidRecordStructure(record)).toBe(true);
    });
  });

  test('should read and parse all XML files in the data folder', async () => {
    const content = await readFiles('xml');
    if (content.length === 0) {
      throw new Error('❗ no XML files found in data folder..');
    }
    expect(content).not.toEqual([]);

    const parsed = await parseData(content, 'xml');
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed).not.toEqual([]);

    parsed.map((record) => {
      expect(isValidRecordStructure(record)).toBe(true);
    });
  });
});
