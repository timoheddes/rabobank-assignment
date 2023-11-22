import * as fs from 'fs';
import * as path from 'path';

import { parseData } from '../src/utils/parser';
// import type { DataFormat } from '../src/utils/parser';

describe('#read', () => {
  async function parseAllCSVFiles(): Promise<any[]> {
    const dataDir = path.join(__dirname, '../data');
    const files = fs.readdirSync(dataDir);
    const csvFiles = files.filter(
      (file) => path.extname(file) === '.csv'
    );
    const results = [];
    for (const file of csvFiles) {
      const data = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      const jsonData = await parseData(data, 'csv');
      results.push(jsonData);
    }
    return results;
  }

  test('should parse all CSV files in the data folder', async () => {
    const results = await parseAllCSVFiles();
    console.log(results);
  });
});
