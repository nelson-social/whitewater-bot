/* eslint-disable no-console */
import { postWeatherStatus } from './bot.js';

postWeatherStatus()
  .then((status) => console.log(`Posted ${status.url}: ${status.content}`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
