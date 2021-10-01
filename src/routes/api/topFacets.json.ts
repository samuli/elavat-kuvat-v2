import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { facetPromise, loadPromises } from '$lib/util';

export const get: RequestHandler<Locals> = async (request) => {
  const fetchTopics = facetPromise(fetch, 'topic', topicFacetsUrl(''));
  const fetchGenres = facetPromise(fetch, 'genre', genreFacetsUrl);
  let topics = [];
  let genres = [];
  [topics, genres] = await loadPromises([fetchTopics, fetchGenres]);

  return {
    body: {
      topics,
      genres,
    },
  };
};
