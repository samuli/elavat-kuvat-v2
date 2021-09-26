import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { filterFacetFields, fetchOptions } from '$lib/util';

export async function get({ query }) {
  const facet = query.get('facet');
  const url = facet === 'topic' ? topicFacetsUrl('') : genreFacetsUrl;
  const res = await fetch(url, fetchOptions);
  if (res.ok) {
    const data = await res.json();
    return {
      status: 200,
      body: filterFacetFields((data.facets as Record<string, IFacet[]>)[`${facet}_facet`]).map(
        (f) => f.value
      ),
    };
  }
  return {
    status: 500,
  };
}
