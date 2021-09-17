//import { isServer } from '@/lib/util';

type IVideoUrl = {
  src: string;
  title: string;
  type: string;
};
type iRecordUrl = {
  videoSources?: IVideoUrl[];
  text: string;
};
type iFacet = {
  translated: string;
  value: string;
};
type TRecordId = string;
type iRecord = {
  id: TRecordId;
  title: string;
  rawData?: Record<string, unknown>;
  recordPage?: string;
  urls?: IRecordUrl[];
  images?: string[];
  buildings: iFacet[];
  genres?: iFacet[];
  topics?: iFacet[];
};
type iApiResult = {
  status: string;
  resultCount: number;
};
type iSearchResult = iApiResult & {
  records?: iRecord[];
};
type iFacetResult = iApiResult & {
  facets?: Record<string, iFacet[]>;
};
type TDaterangeEnd = number | '*';
type TDaterange = [number, TDaterangeEnd];

export type _iRecord = iRecord;
export type _iFacet = iFacet;
export type _iFacetResult = iFacetResult;
export type _iSearchResult = iSearchResult;
export type _TDateRange = TDaterage;

//export const clientBase = process.env.NEXT_PUBLIC_API_BASE;
const base = 'https://api.finna.fi/api/v1';
//const base = 'http://localhost:3001/api/v1';
// const base = 'https://square-sound-4a46.samuli.workers.dev'; //'http://localhost:3001/api/v1';
const limit = 20;

const getFilter = (key: string, val: string): string => `${key}=${encodeURIComponent(val)}`;
const getApiFilter = (key: string, val: string): string =>
  `filter[]=${key}:${encodeURIComponent(val)}`;

const filters = (daterange?: TDaterange): string => {
  daterange = daterange || [1900, '*'];
  const filters = [
    'free_online_boolean:1',
    'datasource_str_mv:kavi',
    '~format_ext_str_mv:1/Video/Video/',
    '~format_ext_str_mv:1/Video/Short/',
    '-id:kavi.elonet_elokuva_1611548',
    '-genre_facet:katsaus',
  ];
  filters.push(`search_daterange_mv:"[${daterange[0]} TO ${daterange[1]}]"`);
  return filters.map((f) => `filter[]=${encodeURIComponent(f)}`).join('&');
};

const autocompleteUrl = (lookfor: string, limit: number): string => {
  const fields = ['title', 'id', 'images'].map((f) => `field[]=${f}`).join('&');
  return `${base}/search?lookfor=${encodeURIComponent(
    lookfor
  )}&${filters()}&${fields}&limit=${limit}`;
};

const searchUrl = (
  lookfor: string,
  page = 1,
  topic?: string,
  genre?: string,
  daterange?: TDaterange,
  resultCount: number = limit,
  recFields = ['title', 'id', 'images']
): string => {
  const queryFilters =
    filters(daterange) +
    (topic ? `&filter[]=topic_facet:${encodeURIComponent(topic)}` : '') +
    (genre ? `&filter[]=genre_facet:${encodeURIComponent(genre)}` : '');

  const fields = recFields.map((f) => `field[]=${f}`).join('&');
  return `${base}/search?lookfor=${encodeURIComponent(
    lookfor
  )}&${queryFilters}&${fields}&limit=${resultCount}&page=${page}`;
};

const frontPageUrl = (): string => {
  // return `${base}/search?lookfor=kekkonen&${filters()}`;

  const randomSets = [
    ['genre_facet', 'mainos'],
    ['genre_facet', 'animaatio'],
    ['genre_facet', 'tv-tuotanto'],
    ['genre_facet', 'opetuselokuva'],
    ['genre_facet', 'henkilödokumentti'],
    ['genre_facet', 'ammatinkuvaus'],
    ['genre_facet', 'draamadokumentti'],
    ['genre_facet', 'teollisuusdokumentti'],

    ['topic_facet', 'henkilöautot'],
    ['topic_facet', 'tehtaat'],
    ['topic_facet', 'matkailu'],
    ['topic_facet', 'pankit'],
    ['topic_facet', 'maisema'],
    ['topic_facet', 'muoti'],
    ['topic_facet', 'kahvi'],
    ['topic_facet', 'kaupungit'],
    ['topic_facet', 'virvoitusjuomat'],
    ['topic_facet', 'hygienia'],
    ['topic_facet', 'elintarvikkeet'],
    ['topic_facet', 'ruoanvalmistus'],
    ['topic_facet', 'maatalous'],
    ['topic_facet', 'myymälät'],
    ['topic_facet', 'rakennukset'],

    ['search_daterange_mv', '[1950 TO 1959]'],
    ['search_daterange_mv', '[1960 TO 1969]'],
    ['search_daterange_mv', '[1970 TO 1979]'],
    ['search_daterange_mv', '[1980 TO 2000]'],
  ];
  const randomSet = randomSets[Math.floor(Math.random() * randomSets.length)];
  const queryFilters = filters() + '&' + getApiFilter(randomSet[0], randomSet[1]);
  const fields = ['title', 'id', 'images'].map((f) => `field[]=${f}`).join('&');
  return `${base}/search?${queryFilters}&${fields}&limit=20&sort=first_indexed%20desc`;
};

const facetsUrl = (
  facet: string,
  topicFilter?: string,
  genreFilter?: string,
  daterange?: TDaterange,
  lookfor?: string
): string => {
  const queryFilters =
    filters(daterange) +
    (topicFilter ? `&${getApiFilter('topic_facet', topicFilter)}` : '') +
    (genreFilter ? `&${getApiFilter('genre_facet', genreFilter)}` : '');

  const facets = `facet[]=${facet}`;
  return `${base}/search?lookfor=${
    lookfor ? encodeURIComponent(lookfor) : ''
  }&${queryFilters}&${facets}&limit=0`;
};
const topicFacetsUrl = (
  lookfor?: string,
  topic?: string,
  genre?: string,
  daterange?: TDaterange
): string => {
  return facetsUrl('topic_facet', topic, genre, daterange, lookfor);
};
const genreFacetsUrl = facetsUrl('genre_facet');
const yearFacetsUrl = facetsUrl('main_date_str');

const recordFields = [
  'title',
  'id',
  'images',
  'urls',
  'recordPage',
  'imageRights',
  'rawData',
  'buildings',
];
const recordUrl = (id: TRecordId): string => {
  const fields = recordFields.map((f) => `field[]=${f}`).join('&');
  return `${base}/record?id=${id}&${fields}`;
};

// const recordUrl = (id: string): string => `/view?id=${encodeURIComponent(id)}`;

const extractVideoUrls = (rec: IRecord): IVideoUrl[] => {
  if (typeof rec.urls === 'undefined') {
    return [];
  }
  const mimeType = 'application/x-mpegURL';
  const videoUrls: IVideoUrl[] = [];
  (rec.urls || []).forEach((url: IRecordUrl) => {
    (url.videoSources || []).forEach((videoUrl) => {
      if (videoUrl.type === mimeType) {
        videoUrls.push({ ...videoUrl, title: url.text });
      }
    });
  });
  return videoUrls;
};

const getField = (rec: IRecord, field: string): string | undefined => {
  if (rec.rawData) {
    return (rec.rawData[field] as string) || undefined;
  }
  return undefined;
};

const finnaRecordPage = (id: string): string => `https://finna.fi${id}`;

export {
  // iRecord,
  // iFacet,
  // iFacetResult,
  extractVideoUrls,
  autocompleteUrl,
  frontPageUrl,
  genreFacetsUrl,
  getFilter,
  recordFields,
  recordUrl,
  limit as searchLimit,
  searchUrl,
  topicFacetsUrl,
  yearFacetsUrl,
};
