<script context="module" lang="ts">
  import Results from '../../../components/Results/index.svelte';
  import { searchUrl, topicFacetsUrl, topicFacetsUrl } from '$lib/api';
  import { facetPromise, loadPromises, promisifyRequest, searchPromise } from '$lib/util';
  import type { _iRecord as iRecord } from '$lib/api';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const facetKey = page.params.facet; //params = page.params.params.split('/');
    const facetValue = page.params.id;
    const resultPage = Number(page.query.get('page') || 1);
    let topicsUrl = '';
    let recordsUrl = '';
    switch (facetKey) {
      case 'topic':
        recordsUrl = searchUrl('', resultPage, facetValue);
        topicsUrl = topicFacetsUrl('', facetValue);
        break;
      case 'genre':
        recordsUrl = searchUrl('', resultPage, null, facetValue);
        topicsUrl = topicFacetsUrl('', null, facetValue);
        console.log(topicsUrl);
        break;
      case 'date':
        const range = [1900, 2000];
        recordsUrl = searchUrl('', resultPage, null, null, range);
        topicsUrl = topicFacetsUrl('', null, null, range);
        break;
      case 'clips':
        recordsUrl = searchUrl('', resultPage);
        topicsUrl = topicFacetsUrl('');
        break;
    }
    // const fetchTopics = promisifyRequest(await getFacets('topic', topicFacetsUrl('', topic)));
    const fetchTopics = facetPromise(fetch, 'topic', topicsUrl); //topicFacetsUrl('', facetValue));
    const fetchRecords = searchPromise(fetch, recordsUrl); //searchUrl('', 1, facetValue));
    const [topics, { records, resultCount }] = await loadPromises([fetchTopics, fetchRecords]);
    return {
      props: {
        topics,
        records,
        resultCount,
        resultPage,
      },
    };
  };
</script>

<script lang="ts">
  export let records: iRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
</script>

<Results
  resultPage="{resultPage}"
  resultCount="{resultCount}"
  records="{records}"
  topics="{topics}"
/>
