import * as fs from 'fs';
import * as path from 'path';
import type { DataFormat } from 'src/types';

/**
 * Reads all files in a directory that have a specific extension.
 * @param {DataFormat} format - The extension of the files to read ('csv' or 'xml').
 * @param {string} [dir='data'] - The directory to read the files from.
 * @returns {Promise<string[]>} - A promise that resolves with an array of the contents of the files.
 * @throws {Error} - Throws an error if there's an issue reading a file.
 */
export const readFiles = async (
  format: DataFormat,
  dir: string = 'data',
): Promise<string[]> => {
  const dataDir = path.join(path.resolve(), dir);

  const files = await fs.promises.readdir(dataDir);
  const filesToProcess = files.filter(
    (file) => path.extname(file) === `.${format}`,
  );

  const fileContents = await Promise.all(
    filesToProcess.map((file) =>
      fs.promises
        .readFile(path.resolve(dataDir, file), 'utf-8')
        .catch((error) => {
          console.error(`Error reading file ${file}: ${error.message}`);
          return null;
        }),
    ),
  );

  return fileContents.filter(Boolean);
};
