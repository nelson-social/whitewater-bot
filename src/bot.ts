import { getWhitewaterConditions } from './whitewater.js';
import { isMediaReady, postMedia, postStatus } from './mastodon.js';
import { downloadFile } from './util/fetch.js';
import { delay, isTruthy } from './util/functional.js';

export async function postWeatherStatus() {
  const conditions = await getWhitewaterConditions();
  const webcamImageFiles = await Promise.all(
    conditions.webcamImages.map(downloadFile)
  );
  const mediaAttachments = await Promise.all(webcamImageFiles.map(postMedia));
  const mediaIds = mediaAttachments.map((m) => m.id);
  while (true) {
    const allReady = await Promise.all(mediaIds.map(isMediaReady));
    if (allReady.filter(isTruthy).length === mediaIds.length) {
      break;
    }
    await delay(1000);
  }
  let statusText = `Weather: ${conditions.weather}
Base temp: ${conditions.baseTempDegC} ℃
Overnight snow: ${conditions.overnightSnowCm}`;
  if (conditions.alert) {
    statusText += `
Message: ${conditions.alert}`;
  }
  return await postStatus(statusText, mediaIds);
}
