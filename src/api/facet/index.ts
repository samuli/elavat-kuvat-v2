import { filterFacetFields } from '$lib/util';
import type { IFacet, IFacetResult } from '$lib/api';
import type { apiResponse } from '../types';

export async function get(facet: string, url: string): Promise<apiResponse> {
  const res = await fetch(url);
  if (res.ok) {
    const data = (await res.json()) as IFacetResult;
    return {
      ok: true,
      body: filterFacetFields((data.facets as Record<string, IFacet[]>)[`${facet}_facet`]).map(
        (f) => f.value
      ),
    };
  }
  return { ok: false };
}
