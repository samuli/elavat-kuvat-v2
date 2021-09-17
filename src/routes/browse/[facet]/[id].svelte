<script context="module" lang="ts">
  import { browser } from '$app/env';
  import { get } from 'svelte/store';
  import Results from '../../../components/Results/index.svelte';
  import topicsStore from '../../../stores/topicsStore';
  import { searchUrl, topicFacetsUrl } from '$lib/api';
  import { facetPromise, loadPromises, searchPromise } from '$lib/util';
  import type { _TDateRange as TDateRange, _iRecord as iRecord } from '$lib/api';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page, context, session }) => {
    const facetKey = page.params.facet;
    const facetValue = page.params.id;
    const resultPage = Number(page.query.get('page') || 1);
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

    // Restore previously loaded topics if url has not changed
    const storedTopicsData = get(topicsStore);
    let loadTopics = true;
    let topics = [];
    if (browser && storedTopicsData && storedTopicsData.url === topicsUrl) {
      loadTopics = false;
      topics = storedTopicsData.topics;
    }
    const fetchRecords = searchPromise(fetch, recordsUrl);
    const fetchTopics = loadTopics
      ? facetPromise(fetch, 'topic', topicsUrl)
      : new Promise<void>((resolve) => resolve());

    // const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);
    const [newTopics, { records, resultCount }] = await loadPromises([fetchTopics, fetchRecords]);
    if (loadTopics) {
      topics = newTopics;
      topicsStore.set({ url: topicsUrl, topics });
    }

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
