import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

import { facetPromise, loadPromises, searchPromise } from '$lib/util';
import { searchUrl, topicFacetsUrl } from '$lib/api';

export const get: RequestHandler<Locals> = async (request) => {
  const lookfor = request.query.get('lookfor');
  const page = request.query.get('page') || 1;
  const recordsUrl = searchUrl(lookfor, page);
  const topicsUrl = topicFacetsUrl(lookfor);
  const fetchRecords = searchPromise(fetch, recordsUrl);
  const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);

  const [records, topics] = await loadPromises([fetchRecords, fetchTopics]);
  return {
    body: { records, topics },
  };
};
