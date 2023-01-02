import { getWhitewaterConditions } from './whitewater.js';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

describe(getWhitewaterConditions.name, () => {
  it("returns an empty alert then there's no alert displayed", async () => {
    const url = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../test/fixtures/whitewater-homepage-no-alert.html'
    );
    const conditions = await getWhitewaterConditions(async () =>
      (await fs.readFile(url)).toString()
    );
    assert.equal(conditions.alert, '');
  });
});
