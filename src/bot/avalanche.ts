import { BaseBot, Bot } from './bot.js';
import { Status } from '../service/mastodon.js';
import { getAvalancheReport } from '../service/avalanche/avalanche.js';
import humanDate from 'human-date';

export default class AvalancheReportBot extends BaseBot implements Bot {
  async postStatus(): Promise<Status | undefined> {
    const report = await getAvalancheReport();
    if (!report) {
      return;
    }
    const statusText = `Forecast for Kootenay Boundary issued at ${humanDate.prettyPrint(
      report.dateIssued
    )}:

${report.highlights}

Alpine: ${report.dangerRatings.alpine}
Tree line: ${report.dangerRatings.treeline}
Below tree line: ${report.dangerRatings.belowTreeline}

${report.url}
`;
    return await this.mastodon.postStatus(statusText);
  }
}
