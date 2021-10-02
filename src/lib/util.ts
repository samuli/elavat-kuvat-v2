import type { ISearchResult, IRecord, IFacet, IFacetResult } from './api';
import type { apiResponse } from '../api/types';
export const filterFacetFields = (facets: IFacet[] = []): IFacet[] => {
  return facets.map((item) => {
    const { value, translated } = item;
    return { value, translated };
  });
};

const facetMap = {
  topic_facet: 'topic',
  genre_facet: 'genre',
};

const map = {
  1900: '1900-',
  1910: '1910-',
  1920: '1920-',
  1930: '1930-',
  1940: '1940-',
  1950: '1950-',
  1960: '1960-',
  1970: '1970-',
  1980: '1980-',
  1990: '1990-',
  2000: '2000-',
};
export const yearTitle = (year: number): string => map[year];

export const facetSearchUrl = (facet: string, value: string): string =>
  `/search?${facetMap[facet]}=${encodeURIComponent(value)}`;
export const facetBrowseUrl = (facet: string, value: string): string =>
  `/browse?facet=${facetMap[facet]}:${encodeURIComponent(value).replace(/äöööö/g, '+')}`;

export const appTitle = 'Elävät kuvat';
export const appSubtitle = 'suomalaisia lyhytelokuvia';

export const decades = [2000, 1990, 1980, 1970, 1960, 1950, 1940, 1930, 1920, 1910, 1900];

export const dateRange = (startYear: number): string =>
  `${startYear}-${startYear < 2000 ? startYear + 9 : '*'}`;

export const loadPromises = async (promises: Promise<unknown>[]) => {
  const mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: 'fulfilled',
          value,
        };
      })
      .catch((reason) => {
        return {
          status: 'rejected',
          reason,
        };
      });
  });
  const data = await Promise.all(mappedPromises);
  return data.map((d) => (d.status === 'fulfilled' ? d.value : []));
};

export const fetchOptions = {
  cf: {
    // Seconds to cache
    cacheTtl: 60 * 60 * 3,
    cacheEverything: true,
  },
};

export const facetPromise = (fetcher, facet, url) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetcher(url, fetchOptions);
    if (res.ok) {
      const data = (await res.json()) as IFacetResult;
      resolve(
        typeof data.facets === 'undefined'
          ? []
          : filterFacetFields((data.facets as Record<string, IFacet[]>)[`${facet}_facet`])
              .map((f) => f.value)
              .filter((f) => f !== facet)
      );
    }
    reject('error topics');
  });
};
export const promisifyRequest = async (request): Promise<apiResponse> => {
  const { ok, body } = await request;
  return new Promise((resolve, reject) => {
    if (ok) {
      resolve(body);
    } else {
      reject('error loading');
    }
  });
};

type searchPromiseData = {
  records: IRecord[];
  resultCount: number;
};
export const searchPromise = (fetcher, url): Promise<searchPromiseData> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetcher(url, fetchOptions);
    if (res.ok) {
      const data = (await res.json()) as ISearchResult;
      resolve({
        records: filterDisplayableRecords(data.records || []),
        resultCount: data.resultCount,
      });
    }
    reject('error random clips');
  });
};

export const filterDisplayableRecords = (records: IRecord[]): IRecord[] =>
  records.filter(
    (rec) =>
      rec.images.length > 0 &&
      rec.urls &&
      rec.urls.find((url) => typeof url.videoSources !== 'undefined')
  );
