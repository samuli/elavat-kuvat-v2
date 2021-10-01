import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { loadPromises, searchPromise } from '$lib/util';

export const get: RequestHandler<Locals> = async (request) => {
  const recordUrl = request.query.get('recordUrl');
  const fetchRandomClips = searchPromise(fetch, recordUrl);
  const [{ records }] = await loadPromises([fetchRandomClips]);

  return {
    body: {
      records,
    },
  };
};
