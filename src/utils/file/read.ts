import * as fs from 'fs';
import * as path from 'path';
import { Constants } from '../../constants';
import type { DataFormat } from '../../types';

/**
 * Reads the content of a file.
 * @param file - Path to the file to read.
 * @returns A promise that resolves with the content of the file.
 * @throws Throws an error if there's an issue reading the file.
 */
export const readFile = async (file: string): Promise<string> =>
  fs.promises.readFile(file, 'utf-8').catch(() => {
    throw new Error(Constants.IO.Errors.file());
  });

/**
 * Returns the absolute path of the given directory.
 * If the given directory is a relative path, it is resolved to an absolute path.
 * @param dir - The directory to get the path of.
 * @returns The absolute path of the directory.
 */
export const getFolderPath = (dir: string) => {
  const isAbsolute = path.isAbsolute(dir);
  return isAbsolute ? dir : path.resolve(dir);
};

/**
 * Reads all files in a directory that have a specific extension.
 * @param format - Extension of the files to read ('csv' or 'xml').
 * @returns A promise that resolves with an array of the contents of the files.
 * @throws Throws an error if there's an issue reading a file or directory.
 */
export const readFolder = async (
  format: DataFormat,
  folder: string,
): Promise<string[]> => {
  const files = await fs.promises.readdir(folder).catch(() => {
    throw new Error(Constants.IO.Errors.folder);
  });
  const filesToProcess = files.filter(
    (file) => path.extname(file) === `.${format}`,
  );

  const fileContents = await Promise.all(
    filesToProcess.map((file) => readFile(path.resolve(folder, file))),
  );

  return fileContents.filter(Boolean);
};
