import * as fs from 'fs';
import * as path from 'path';
import { DataFormat } from 'src/types';

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
      fs.promises.readFile(path.join(dataDir, file), 'utf-8'),
    ),
  );

  return fileContents;
};
