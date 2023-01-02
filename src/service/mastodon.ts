import fetch, { blobFrom, FormData, RequestInit } from 'node-fetch';

export type MediaAttachment = {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  description: string;
};

export type Status = {
  id: string;
  uri: string;
  url: string;
  content: string;
};

interface SimpleRequestInit extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

export default class MastodonService {
  private readonly authHeader: string;
  private readonly apiUrl: string;

  constructor(apiUrl: string, apiToken: string) {
    this.authHeader = `Bearer ${apiToken}`;
    this.apiUrl = apiUrl;
  }

  private async fetch<F>(path: string, init: SimpleRequestInit): Promise<F> {
    if (!init.headers) {
      init.headers = {};
    }
    init.headers['Authorization'] = this.authHeader;
    const res = await fetch(new URL(path, this.apiUrl).href, init);
    if (!res.ok) {
      throw new Error(`Mastodon returned ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as F;
  }

  private async post<F>(path: string, formData: FormData): Promise<F> {
    return await this.fetch(path, {
      method: 'POST',
      body: formData,
    });
  }

  private async get<F>(path: string): Promise<F> {
    return await this.fetch(path, {});
  }

  async postMedia(fileName: string): Promise<MediaAttachment> {
    const formData = new FormData();
    const blob = await blobFrom(fileName);
    formData.append('file', blob);
    return this.post<MediaAttachment>('v2/media', formData);
  }

  async isMediaReady(id: string): Promise<boolean> {
    const media = await this.get<MediaAttachment>(`v1/media/${id}`);
    return !!media.url;
  }

  async postStatus(status: string, mediaIds?: string[]): Promise<Status> {
    const formData = new FormData();
    formData.append('status', status);
    if (mediaIds) {
      for (const mediaId of mediaIds) {
        formData.append('media_ids[]', mediaId);
      }
    }
    return this.post<Status>('v1/statuses', formData);
  }
}
