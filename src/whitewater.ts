import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export type WhitewaterConditions = {
  weather: string;
  overnightSnowCm: number;
  baseTempDegC: number;
};

const WEB_URL = 'https://skiwhitewater.com/conditions/';

function select(document: Document, selector: string): string {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`Element not found at ${selector}`);
  }
  const text = el.textContent;
  if (!text) {
    throw new Error(`No textContent at ${selector}`);
  }
  return text.trim();
}

export async function getWhitewaterConditions(): Promise<WhitewaterConditions> {
  const res = await fetch(WEB_URL);
  const text = await res.text();
  const dom = new JSDOM(text);
  const document = dom.window.document;

  return {
    weather: select(
      document,
      '.snow-summary__item--weather .snow-summary__desc'
    ),
    overnightSnowCm: parseInt(
      select(
        document,
        '.snow-summary__item--overnight .snow-summary__desc .value'
      ),
      10
    ),
    baseTempDegC: parseInt(
      select(document, '.snow-summary__item--base .snow-summary__desc .value'),
      10
    ),
  };
}
