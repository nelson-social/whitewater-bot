import fetch from 'node-fetch';
import * as fs from 'fs';
import tmp from 'tmp';

export async function downloadFile(url: string): Promise<string> {
  const res = await fetch(url);
  const path = tmp.fileSync().name;
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    if (!res.body) {
      return reject(new Error('Expected readable body'));
    }
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
  return path;
}
