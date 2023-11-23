import type { DataFormat } from '../src/types';
import { isValidRecordStructure, parseData, readFiles } from '../src/utils';

describe('process', () => {
  ['csv', 'xml'].forEach((type) => {
    test(`should read all ${type.toUpperCase()} files in the data folder`, async () => {
      const content = await readFiles(type as DataFormat);
      if (content.length === 0) {
        throw new Error(
          `❗ no ${type.toUpperCase()} files found in data folder..`,
        );
      }
      expect(content).not.toEqual([]);

      const parsed = await parseData(content, type as DataFormat);
      expect(parsed.length).toBeGreaterThan(0);
      expect(parsed).not.toEqual([]);

      parsed.forEach((record) => {
        expect(isValidRecordStructure(record)).toBe(true);
      });
    });
  });
});
