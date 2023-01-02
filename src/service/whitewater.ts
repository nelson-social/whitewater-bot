import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import {
  nodeIsElement,
  selectElements,
  selectInt,
  selectText,
  selectTextMaybe,
} from '../util/dom.js';
import { isTruthy } from '../util/functional.js';

export type WhitewaterConditions = {
  weather: string;
  overnightSnowCm: number;
  baseTempDegC: number;
  alert: string;
  webcamImages: string[];
};

const WHITEWATER_CONDITIONS_URL = 'https://skiwhitewater.com/conditions/';

const fetchWhitewaterConditionsPage = async () =>
  (await fetch(WHITEWATER_CONDITIONS_URL)).text();

export async function getWhitewaterConditions(
  fetchPageContent: () => Promise<string> = fetchWhitewaterConditionsPage
): Promise<WhitewaterConditions> {
  const dom = new JSDOM(await fetchPageContent());
  const document = dom.window.document;

  return {
    weather: selectText(
      document,
      '.snow-summary__item--weather .snow-summary__desc'
    ),
    overnightSnowCm: selectInt(
      document,
      '.snow-summary__item--overnight .snow-summary__desc .value'
    ),
    baseTempDegC: selectInt(
      document,
      '.snow-summary__item--base .snow-summary__desc .value'
    ),
    alert: selectTextMaybe(document, '.alert-banner a') || '',
    webcamImages: selectElements(document, 'img.webcams__image')
      .filter(nodeIsElement)
      .map((el) => el.getAttribute('src') || '')
      .filter(isTruthy),
  };
}
