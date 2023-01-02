import MastodonService, { Status } from '../service/mastodon.js';

export interface Bot {
  postStatus(): Promise<Status | undefined>;
}

export abstract class BaseBot implements Bot {
  protected mastodon;
  constructor() {
    if (!process.env.MASTODON_API) {
      throw new Error('Missing process.env.MASTODON_API');
    }
    if (!process.env.MASTODON_TOKEN) {
      throw new Error('Missing process.env.MASTODON_TOKEN');
    }
    this.mastodon = new MastodonService(
      process.env.MASTODON_API,
      process.env.MASTODON_TOKEN
    );
  }
  abstract postStatus(): Promise<Status | undefined>;
}
