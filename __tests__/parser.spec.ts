import type { DataFormat } from '../src/types';
import {
  isValidRecordStructure,
  parseData,
  readFile,
  readFolder,
} from '../src/utils';

const testDataDirectory = './__tests__/data';

describe('parser', () => {
  ['csv', 'xml'].forEach((type) => {
    test(`should read and parse all ${type.toUpperCase()} files in the test data folder`, async () => {
      // Read all files in the test data folder and verify they are not empty.
      const fileContent = await readFolder(
        type as DataFormat,
        testDataDirectory,
      );
      if (fileContent.length === 0) {
        throw new Error(
          `❗ no ${type.toUpperCase()} files found in data folder..`,
        );
      }
      expect(fileContent).not.toEqual([]);

      // Parse the data from the file contents and verify the records are valid.
      const parsedRecords = await parseData(fileContent, type as DataFormat);
      expect(parsedRecords.length).toBeGreaterThan(0);
      expect(parsedRecords).not.toEqual([]);

      parsedRecords.forEach((record) => {
        expect(isValidRecordStructure(record)).toBe(true);
      });
    });
  });

  test('should throw an error when reading a non-existent directory', async () => {
    await expect(
      readFolder('csv', './__tests__/non-existent-folder'),
    ).rejects.toThrow('Error reading directory');
  });

  test('should throw an error when reading a non-existent file', async () => {
    await expect(
      readFile('./__tests__/non-existent-folder/non-existent-file.csv'),
    ).rejects.toThrow('Error reading file');
  });

  test('should throw an error when parsing invalid XML', async () => {
    const invalidXML = ['records><record</record></records>'];
    await expect(parseData(invalidXML, 'xml')).rejects.toThrow(
      'Error reading XML',
    );
  });

  test('should throw an error when parsing an empty XML file', async () => {
    const invalidXML = ['<records><record></record></records>'];
    await expect(parseData(invalidXML, 'xml')).rejects.toThrow(
      'Invalid XML format: records.record is not an array',
    );
  });

  test('should throw an error when parsing invalid CSV', async () => {
    const invalidCSV = ['Reference,Account Number,Description'];
    await expect(parseData(invalidCSV, 'csv')).rejects.toThrow(
      'Error reading CSV',
    );
  });
});
