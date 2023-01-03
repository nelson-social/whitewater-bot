import assert from 'assert';
import AvalancheReportBot from './avalanche.js';

const report = {
  dateIssued: '2023-01-03T00:00:00Z',
  highlights:
    'Buried weak layers can still be triggered by riders. Remain diligent and stick to low-consequence terrain.',
  confidence: {
    rating: 'Moderate',
    statements: [
      'Uncertainty is due to the fact that persistent slabs are particularly difficult to forecast.',
    ],
  },
  dangerRatings: {
    alpine: 'Considerable',
    treeline: 'Moderate',
    belowTreeline: 'Moderate',
  },
  url: 'https://avalanche.ca/forecasts/ffefe681-ea06-4183-a888-d43f96601fef_abcf4fa25b3825c13033432191fc253745a0935af11bb2ce79589c7dc3628a3c',
};

const status = `Forecast for Kootenay Boundary issued Jan 2, 2023 at 4:00PM PST:

Buried weak layers can still be triggered by riders. Remain diligent and stick to low-consequence terrain.

Alpine: Considerable
Tree line: Moderate
Below tree line: Moderate

https://avalanche.ca/forecasts/ffefe681-ea06-4183-a888-d43f96601fef_abcf4fa25b3825c13033432191fc253745a0935af11bb2ce79589c7dc3628a3c`;

describe(AvalancheReportBot.name, () => {
  it('displays date in Pacific Time', async () => {
    process.env.MASTODON_API = 'x';
    process.env.MASTODON_TOKEN = 'x';
    const bot = new AvalancheReportBot();
    assert.equal(bot.formatStatus(report), status);
  });
});
