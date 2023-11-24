import * as fs from 'fs';
import * as path from 'path';
import type { DataFormat } from 'src/types';

/**
 * Reads the content of a file.
 * @param {string} file - Path to the file to read.
 * @returns {Promise<string>} - Promise that resolves with the content of the file.
 * @throws {Error} - Throws an error if there's an issue reading the file.
 */
export const readFile = async (file: string): Promise<string> =>
  fs.promises.readFile(file, 'utf-8').catch(() => {
    throw new Error('Error reading file');
  });

/**
 * Reads all files in a directory that have a specific extension.
 * @param {DataFormat} format - Extension of the files to read ('csv' or 'xml').
 * @param {string} dir - Directory to read the files from.
 * @returns {Promise<string[]>} - Promise that resolves with an array of the contents of the files.
 * @throws {Error} - Throws an error if there's an issue reading a file or directory.
 */
export const readFolder = async (
  format: DataFormat,
  dir: string,
): Promise<string[]> => {
  const dataDir = path.join(path.resolve(), dir);

  const files = await fs.promises.readdir(dataDir).catch(() => {
    throw new Error('Error reading directory');
  });
  const filesToProcess = files.filter(
    (file) => path.extname(file) === `.${format}`,
  );

  const fileContents = await Promise.all(
    filesToProcess.map((file) => readFile(path.resolve(dataDir, file))),
  );

  return fileContents.filter(Boolean);
};
