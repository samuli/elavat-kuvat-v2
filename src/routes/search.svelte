<script context="module" lang="ts">
  import { onMount } from 'svelte';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy } from 'svelte';
  import navigationState from '../stores/navigationState';
  import { IRecord, searchUrl, topicFacetsUrl } from '$lib/api';
  import { appTitle, loadPromises, searchPromise, facetPromise } from '$lib/util';
  import Results from '../components/Results/index.svelte';

  export const load: Load = async ({ fetch, page }) => {
    const lookfor = page.query.get('lookfor');
    const resultPage = Number(page.query.get('page') || 1);
    const recordsUrl = searchUrl(lookfor, resultPage);
    // const topicsUrl = topicFacetsUrl(lookfor);
    const fetchRecords = searchPromise(fetch, recordsUrl);
    // const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);
    //
    const [{ records, resultCount }] = await loadPromises([fetchRecords]);
    return {
      props: {
        lookfor,
        // topics,
        records,
        resultCount,
        resultPage,
      },
    };
  };
</script>

<script lang="ts">
  export let records: IRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  export let lookfor: string = '';

  let loading = false;
  const unsubscribe = navigationState.subscribe((state) => {
    loading = state === 'loading';
  });
  onDestroy(() => {
    unsubscribe();
  });

  $: {
    const topicsUrl = topicFacetsUrl(lookfor);
    const fetchTopics = facetPromise(fetch, 'topic', topicsUrl);
    const loadFn = async () => {
      const [_topics] = await loadPromises([fetchTopics]);
      topics = _topics;
    };
    loadFn();
  }
</script>

<svelte:head>
  <title>{lookfor} | {appTitle}</title>
</svelte:head>

{#if !loading && records.length === 0}
  <p>Ei tuloksia...</p>
{:else}
  <Results
    lookfor="{lookfor}"
    resultPage="{resultPage}"
    resultCount="{resultCount}"
    records="{records}"
    topics="{topics}"
    heading="Haku: "
  />
{/if}
