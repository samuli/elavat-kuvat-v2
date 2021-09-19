import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { filterFacetFields } from '$lib/util';
import type { IFacet, IFacetResult } from '$lib/api';

export async function get({ query }) {
  console.log(query);
  const url = new URL('https://api.finna.fi/api/v1/search');
  url.search = query.toString();
  const res = await fetch(url);
  console.log(res);
  if (res.ok) {
    return {
      body: await res.json(),
    };
  }
  // const res = await fetch(facet === 'topic' ? topicFacetsUrl() : genreFacetsUrl);
  // const data = (await res.json()) as iFacetResult;
  // return {
  //   body: filterFacetFields((data.facets as Record<string, iFacet[]>)[`${facet}_facet`]).map(
  //     (f) => f.value
  //   ),
  // };
  return {
    body: 'jee',
  };
}
