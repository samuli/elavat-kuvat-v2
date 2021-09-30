import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import type { IRecord } from '$lib/api';
import { facetPromise, loadPromises, searchPromise } from '$lib/util';
import { searchUrl, topicFacetsUrl } from '$lib/api';

export const get: RequestHandler<Locals> = async (request) => {
  const facetKey = request.params.facet;
  const facetValue = request.params.id;
  const resultPage = Number(request.query.get('page') || 1);
  let topicsUrl = '';
  let recordsUrl = '';
  switch (facetKey) {
    case 'topic':
      recordsUrl = searchUrl('', resultPage, facetValue);
      topicsUrl = topicFacetsUrl('', facetValue, null);
      break;
    case 'genre':
      recordsUrl = searchUrl('', resultPage, null, facetValue);
      topicsUrl = topicFacetsUrl('', null, facetValue);
      break;
    case 'date':
      let range: TDateRange = facetValue
        .split('-')
        .map((year) => (year === '*' ? year : Number(year)));
      recordsUrl = searchUrl('', resultPage, null, null, range);
      topicsUrl = topicFacetsUrl('', null, null, range);
      break;
    case 'clips':
      recordsUrl = searchUrl('', resultPage);
      topicsUrl = topicFacetsUrl('');
      break;
  }

  const fetchRecords = searchPromise(fetch, recordsUrl);
  const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);
  const [topics, { records, resultCount }] = await loadPromises([fetchTopics, fetchRecords]);

  return {
    body: {
      topics: topics.filter((f) => f !== facetValue),
      records,
      resultCount,
      resultPage,
    },
  };
};
