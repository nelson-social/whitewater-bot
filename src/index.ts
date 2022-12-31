/* tslint:disable:no-console */
import { getWhitewaterConditions } from './whitewater.js';

async function run() {
  const conditions = await getWhitewaterConditions();
  console.log(conditions);
}

run().catch((e) => console.error(e));
