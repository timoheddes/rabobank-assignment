import * as path from 'path';
import { Constants } from '../src/constants';
import type { DataFormat } from '../src/types';
import {
  getFolderPath,
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
      const files = await readFolder(type as DataFormat, testDataDirectory);
      if (files.length === 0) {
        throw new Error(
          `❗ no ${type.toUpperCase()} files found in data folder..`,
        );
      }
      expect(files).not.toEqual([]);

      // Parse the data from the file contents and verify the records are valid.
      const parsedRecords = await parseData(files, type as DataFormat);
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
    ).rejects.toThrow(Constants.IO.Errors.folder);
  });

  test('should throw an error when reading a non-existent file', async () => {
    await expect(
      readFile('./__tests__/non-existent-folder/non-existent-file.csv'),
    ).rejects.toThrow('Error reading file');
  });

  test('should throw an error when parsing invalid XML', async () => {
    const invalidXML = ['records><record</record></records>'];
    await expect(parseData(invalidXML, 'xml')).rejects.toThrow(
      Constants.IO.Errors.file('XML'),
    );
  });

  test('should throw an error when parsing an empty XML file', async () => {
    const invalidXML = ['<records><record></record></records>'];
    await expect(parseData(invalidXML, 'xml')).rejects.toThrow(
      Constants.IO.Errors.file('XML'),
    );
  });

  test('should throw an error when parsing invalid CSV', async () => {
    const invalidCSV = ['Reference,Account Number,Description'];
    await expect(parseData(invalidCSV, 'csv')).rejects.toThrow(
      Constants.IO.Errors.file('CSV'),
    );
  });
});

describe('getFolderPath', () => {
  it('should return the same path if it is absolute', () => {
    const absolutePath = '/absolute/path';
    const result = getFolderPath(absolutePath);
    expect(result).toEqual(absolutePath);
  });

  it('should return an absolute path if the given path is relative', () => {
    const relativePath = 'relative/path';
    const result = getFolderPath(relativePath);
    expect(result).toEqual(path.resolve(relativePath));
  });
});
