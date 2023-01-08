import { BaseBot, Bot } from './bot.js';
import { getWhitewaterConditions } from '../service/whitewater.js';
import { Status } from '../service/mastodon.js';
import { downloadFile } from '../util/fetch.js';
import { isTruthy } from '../util/functional.js';
import retry from 'async-retry';

export default class WhitewaterConditionsBot extends BaseBot implements Bot {
  async postStatus(): Promise<Status> {
    const conditions = await getWhitewaterConditions();
    const webcamImageFiles = await Promise.all(
      conditions.webcamImages.map(downloadFile)
    );
    const mediaAttachments = await Promise.all(
      webcamImageFiles.map((file) => this.mastodon.postMedia(file))
    );
    const mediaIds = mediaAttachments.map((m) => m.id);
    await retry(async () => {
      console.log('Awaiting media processing...');
      const allReady = await Promise.all(
        mediaIds.map((mediaId) => this.mastodon.isMediaReady(mediaId))
      );
      if (allReady.filter(isTruthy).length < mediaIds.length) {
        throw new Error('Not all media is ready');
      }
    });
    let statusText = `Weather: ${conditions.weather}
Base temp: ${conditions.baseTempDegC} ℃
Overnight snow: ${conditions.overnightSnowCm} cm`;
    if (conditions.alert) {
      statusText += `
Message: ${conditions.alert}`;
    }
    statusText +=
      '\n#Weather #Skiing #Snowboarding #Backcountry #Slackcountry #SkiTouring #Splitboarding #Whitewater';
    return await this.mastodon.postStatus(statusText, mediaIds);
  }
}
