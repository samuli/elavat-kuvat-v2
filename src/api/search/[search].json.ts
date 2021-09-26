import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { filterFacetFields } from '$lib/util';
import type { IFacet, IFacetResult } from '$lib/api';

export async function get({ query }) {
  const url = new URL('https://api.finna.fi/api/v1/search');
  url.search = query.toString();
  const res = await fetch(url);
  if (res.ok) {
    return {
      body: await res.json(),
    };
  }
  return {
    body: 'jee',
  };
}
