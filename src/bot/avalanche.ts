import { BaseBot, Bot } from './bot.js';
import { Status } from '../service/mastodon.js';
import {
  AvalancheReport,
  getAvalancheReport,
} from '../service/avalanche/avalanche.js';
import dateFnsTz from 'date-fns-tz';
const { formatInTimeZone } = dateFnsTz;

const STATUS_TIME_ZONE = 'America/Vancouver';

export default class AvalancheReportBot extends BaseBot implements Bot {
  async postStatus(): Promise<Status | undefined> {
    const report = await getAvalancheReport();
    if (!report) {
      return;
    }
    console.log(report);
    const statusText = this.formatStatus(report);
    console.log(statusText);
    return await this.mastodon.postStatus(statusText);
  }
  formatStatus(report: AvalancheReport): string {
    return `#AvalancheForecast for #KootenayBoundary issued ${formatInTimeZone(
      new Date(report.dateIssued),
      STATUS_TIME_ZONE,
      `eeee MMM d, yyyy 'at' h:mma zzz`
    )}:

${report.highlights}

Alpine: ${report.dangerRatings.alpine}
Tree line: ${report.dangerRatings.treeline}
Below tree line: ${report.dangerRatings.belowTreeline}

#Skiing #Snowboarding #Splitboarding #SkiTouring #Backcountry #Avalanche

${report.url}`;
  }
}
