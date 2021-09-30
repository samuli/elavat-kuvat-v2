import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

import { facetPromise, loadPromises, searchPromise } from '$lib/util';
import { extractVideoUrls, recordUrl } from '$lib/api';
import { finnaRecordPage, getField as getRecordField } from '$lib/record';

export const get: RequestHandler<Locals> = async (request) => {
  const url = recordUrl(request.params.id);
  const recordPromise = searchPromise(fetch, url);
  const [{ records }] = await loadPromises([recordPromise]); //res = await fetch(url);
  const videoUrls = extractVideoUrls(records[0]);
  const record = records[0];

  return {
    body: {
      record,
      videoUrls,
      topics: getRecordField(record, 'topic_facet') || [],
      genres: getRecordField(record, 'genre_facet') || [],
      description: record.rawData?.description || null,
      poster: record.images.length ? `https://api.finna.fi${record.images[0]}` : null,
    },
  };
};
