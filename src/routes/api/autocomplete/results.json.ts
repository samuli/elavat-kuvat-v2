import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

import { loadPromises, searchPromise } from '$lib/util';
import { autocompleteUrl } from '$lib/api';

export const get: RequestHandler<Locals> = async (request) => {
  const lookfor = request.query.get('lookfor');
  const recordsUrl = autocompleteUrl(lookfor, 20);
  const fetchRecords = searchPromise(fetch, recordsUrl);

  const [records] = await loadPromises([fetchRecords]);
  return {
    body: { ...records },
  };
};
