import fetch, { blobFrom, FormData } from 'node-fetch';

type MediaAttachment = {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  description: string;
};

type Status = {
  id: string;
  uri: string;
  url: string;
  content: string;
};

const MASTODON_API = process.env.MASTODON_API; // e.g. https://nelson.social/api/

const MASTODON_TOKEN = process.env.MASTODON_TOKEN;

const HEADERS = { Authorization: `Bearer ${MASTODON_TOKEN}` };

async function post<F>(path: string, formData: FormData): Promise<F> {
  const res = await fetch(new URL(path, MASTODON_API).href, {
    method: 'POST',
    body: formData,
    headers: HEADERS,
  });
  return (await res.json()) as F;
}

async function get<F>(path: string): Promise<F> {
  const res = await fetch(new URL(path, MASTODON_API).href, {
    headers: HEADERS,
  });
  return (await res.json()) as F;
}

export async function postMedia(fileName: string): Promise<MediaAttachment> {
  const formData = new FormData();
  const blob = await blobFrom(fileName);
  formData.append('file', blob);
  return post<MediaAttachment>('v2/media', formData);
}

export async function isMediaReady(id: string): Promise<boolean> {
  const media = await get<MediaAttachment>(`v1/media/${id}`);
  return !!media.url;
}

export async function postStatus(
  status: string,
  mediaIds?: string[]
): Promise<Status> {
  const formData = new FormData();
  formData.append('status', status);
  if (mediaIds) {
    for (const mediaId of mediaIds) {
      formData.append('media_ids[]', mediaId);
    }
  }
  return post<Status>('v1/statuses', formData);
}
