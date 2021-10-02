<script context="module" lang="ts">
  import { browser } from '$app/env';
  import topicsStore from '../stores/topicsStore';
  import { get } from 'svelte/store';
  import Results from '../components/Results/index.svelte';
  import { appTitle, facetPromise, loadPromises, searchPromise } from '$lib/util';
  import { IRecord, searchUrl, topicFacetsUrl } from '$lib/api';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const [facetKey, facetValue] = page.query.get('facet').split(':');
    const resultPage = Number(page.query.get('page') || 1);
    let topicsUrl = '';
    let recordsUrl = '';
    let heading = '';
    let topics = [];
    switch (facetKey) {
      case 'topic':
        recordsUrl = searchUrl('', resultPage, facetValue);
        topicsUrl = topicFacetsUrl('', facetValue, null);
        heading = 'Aihe';
        break;
      case 'genre':
        recordsUrl = searchUrl('', resultPage, null, facetValue);
        topicsUrl = topicFacetsUrl('', null, facetValue);
        heading = 'Genre';
        break;
      case 'date':
        let range: TDateRange = facetValue
          .split('-')
          .map((year) => (year === '*' ? year : Number(year)));
        recordsUrl = searchUrl('', resultPage, null, null, range);
        topicsUrl = topicFacetsUrl('', null, null, range);
        heading = 'Aikakausi';
        break;
      case 'clips':
        recordsUrl = searchUrl('', resultPage);
        topicsUrl = topicFacetsUrl('');
        heading = 'Selaa elokuvia';
        break;
    }
    let title = facetKey !== 'clips' ? `${heading}: ${facetValue}` : heading;
    // Restore previously loaded topics if url has not changed
    const storedTopicsData = get(topicsStore);
    let loadTopics = true;
    // let topics = [];
    if (browser && storedTopicsData && storedTopicsData.url === topicsUrl) {
      loadTopics = false;
      topics = storedTopicsData.topics;
    }
    const fetchRecords = searchPromise(fetch, recordsUrl);
    // const fetchTopics = loadTopics
    //   ? facetPromise(fetch, 'topic', topicsUrl)
    //   : new Promise<void>((resolve) => resolve());
    const [{ records, resultCount }] = await loadPromises([fetchRecords]);
    // if (loadTopics) {
    //   topics = newTopics.filter((f) => f !== facetValue);
    //   topicsStore.set({ url: topicsUrl, topics });
    // }
    return {
      props: {
        // topics,
        records,
        resultCount,
        resultPage,
        heading,
        title,
        topicsUrl,
        loadTopics,
        topics,
      },
    };
  };
</script>

<script lang="ts">
  export let records: IRecord[] = [];
  export let resultCount = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  export let title: string;

  export let loadTopics: boolean;
  export let topicsUrl: string;
  $: {
    if (loadTopics) {
      topicsStore.set({ url: topicsUrl, topics: [] });
      topics = [];
      const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);

      const loadFn = async () => {
        const [_topics] = await loadPromises([fetchTopics]);
        topics = _topics;
        topicsStore.set({ url: topicsUrl, topics });
      };
      loadTopics = false;
      loadFn();
    }
  }
</script>

<svelte:head>
  <title>{title} | {appTitle}</title>
</svelte:head>

<Results
  resultPage="{resultPage}"
  resultCount="{resultCount}"
  records="{records}"
  heading="{title}"
  topics="{topics}"
/>
