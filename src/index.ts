import AvalancheReportBot from './bot/avalanche.js';
import WhitewaterConditionsBot from './bot/whitewater.js';
import { Bot } from './bot/bot.js';
import { logger } from './util/logging.js';

type BotId = 'avalanche' | 'whitewater';

const bots: Record<BotId, Bot> = {
  avalanche: new AvalancheReportBot(),
  whitewater: new WhitewaterConditionsBot(),
};

const args = process.argv.slice(2);

const botId = args[0] as BotId;

const bot = bots[botId];

if (!bot) {
  throw new Error(
    `Missing or unknown bot ID.  Supported bot IDs: ${Object.keys(bots).join(
      ', '
    )}`
  );
}

bot
  .postStatus()
  .then((status) => {
    if (status) {
      logger.info(`Posted ${status.url}: ${status.content}`);
    } else {
      logger.info(`No status posted`);
    }
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
