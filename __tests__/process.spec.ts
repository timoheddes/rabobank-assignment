import { parseData, readFiles } from '../src/utils';

describe('process', () => {
  test('should read and parse all CSV files in the data folder', async () => {
    const content = await readFiles('csv');
    expect(content).not.toEqual([]);

    const parsed = await parseData(content, 'csv');
    expect(parsed).not.toEqual([]);
    expect(parsed.length).toBeGreaterThan(0);
  });

  test('should read and parse all XML files in the data folder', async () => {
    const content = await readFiles('xml');
    expect(content).not.toEqual([]);

    const parsed = await parseData(content, 'xml');
    expect(parsed).not.toEqual([]);
    expect(parsed.length).toBeGreaterThan(0);
  });
});
