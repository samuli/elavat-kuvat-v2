import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { facetPromise, loadPromises, searchPromise } from '$lib/util';

export const get: RequestHandler<Locals> = async (request) => {
  const recordUrl = request.query.get('recordUrl');
  console.log('rec', recordUrl);
  console.log(request);
  const fetchTopics = facetPromise(fetch, 'topic', topicFacetsUrl(''));
  const fetchGenres = facetPromise(fetch, 'genre', genreFacetsUrl);
  const fetchRandomClips = searchPromise(fetch, recordUrl);
  const [topics, genres, { records }] = await loadPromises([
    fetchTopics,
    fetchGenres,
    fetchRandomClips,
  ]);

  return {
    body: {
      topics,
      genres,
      records,
    },
  };
};
