import * as fs from 'fs';
import * as path from 'path';

import type { DataFormat, RecordStructure } from '../src/types';
import { parseData } from '../src/utils/parser';

describe('process', () => {
  async function parseFiles(format: DataFormat): Promise<RecordStructure[]> {
    const dataDir = path.join(__dirname, '../data');
    const files = fs.readdirSync(dataDir);
    const filesOfFormat = files.filter(
      (file) => path.extname(file) === `.${format}`,
    );
    let parsedJSON: RecordStructure[] = [];
    for (const file of filesOfFormat) {
      const data = await fs.promises.readFile(
        path.join(dataDir, file),
        'utf-8',
      );
      const fileJSON = await parseData(data, format);
      parsedJSON = [...parsedJSON, ...fileJSON];
    }
    return parsedJSON;
  }

  test('should parse all CSV files in the data folder', async () => {
    const results = await parseFiles('csv');
    console.log('CSV', results);
  });

  test('should parse all XML files in the data folder', async () => {
    const results = await parseFiles('xml');
    console.log('XML', results);
  });
});
