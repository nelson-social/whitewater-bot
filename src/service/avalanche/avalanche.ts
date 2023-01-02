import fetch from 'node-fetch';
import { AvalancheAPIResponse } from './types.js';
import { logger } from '../../util/logging.js';
import striptags from 'striptags';

const AVALANCHE_API_URL =
  'https://api.avalanche.ca/forecasts/en/products/point?lat=49.4928&long=-117.2948';

export type AvalancheReport = {
  dateIssued: string;
  highlights: string;
  confidence: {
    rating: string;
    statements: string[];
  };
  dangerRatings: {
    alpine: string;
    treeline: string;
    belowTreeline: string;
  };
  url: string;
};

export async function getAvalancheReport(): Promise<
  AvalancheReport | undefined
> {
  const res = await fetch(AVALANCHE_API_URL);
  if (!res.ok) {
    throw new Error(`Avalanche API returned ${res.status}: ${res.statusText}`);
  }
  const data = (await res.json()) as AvalancheAPIResponse;
  if (!data.report.dangerRatings) {
    logger.info('There is currently no report for specified location');
    return;
  }
  return {
    dateIssued: data.report.dateIssued,
    highlights: striptags(data.report.highlights),
    confidence: {
      rating: data.report.confidence.rating.display,
      statements: data.report.confidence.statements,
    },
    dangerRatings: {
      alpine: data.report.dangerRatings[0].ratings.alp.rating.display,
      treeline: data.report.dangerRatings[0].ratings.tln.rating.display,
      belowTreeline: data.report.dangerRatings[0].ratings.btl.rating.display,
    },
    url: data.url,
  };
}
