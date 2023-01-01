import { getWhitewaterConditions } from './whitewater.js';
import { isMediaReady, postMedia, postStatus } from './mastodon.js';
import { downloadFile } from './util/fetch.js';
import { isTruthy } from './util/functional.js';
import retry from 'async-retry';

export async function postWeatherStatus() {
  const conditions = await getWhitewaterConditions();
  const webcamImageFiles = await Promise.all(
    conditions.webcamImages.map(downloadFile)
  );
  const mediaAttachments = await Promise.all(webcamImageFiles.map(postMedia));
  const mediaIds = mediaAttachments.map((m) => m.id);
  await retry(async () => {
    console.log('Awaiting media processing...');
    const allReady = await Promise.all(mediaIds.map(isMediaReady));
    if (allReady.filter(isTruthy).length < mediaIds.length) {
      throw new Error('Not all media is ready');
    }
  });
  let statusText = `Weather: ${conditions.weather}
Base temp: ${conditions.baseTempDegC} ℃
Overnight snow: ${conditions.overnightSnowCm}`;
  if (conditions.alert) {
    statusText += `
Message: ${conditions.alert}`;
  }
  return await postStatus(statusText, mediaIds);
}
