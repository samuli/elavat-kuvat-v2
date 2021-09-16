import { genreFacetsUrl, topicFacetsUrl } from '$lib/api';
import { filterFacetFields } from '$lib/util';
import type { _iFacet as iFacet, _iFacetResult as iFacetResult } from '$lib/api';
import type { apiResponse } from '../types';

export async function get(facet: string, url: string): Promise<apiResponse> {
  const res = await fetch(url);
  if (res.ok) {
    const data = (await res.json()) as iFacetResult;
    return {
      ok: true,
      body: filterFacetFields((data.facets as Record<string, iFacet[]>)[`${facet}_facet`]).map(
        (f) => f.value
      ),
    };
  }
  return { ok: false };
}
