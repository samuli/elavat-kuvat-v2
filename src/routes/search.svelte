<script context="module" lang="ts">
  import { onDestroy } from 'svelte';
  import navigationState from '../stores/navigationState';
  import type { IRecord } from '$lib/api';
  import { appTitle, fetchOptions } from '$lib/util';
  import Results from '../components/Results/index.svelte';

  export const load: Load = async ({ fetch, page }) => {
    const lookfor = page.query.get('lookfor');
    const resultPage = Number(page.query.get('page') || 1);
    const res = await fetch(
      `/api/search/results.json?lookfor=${lookfor}&page=${resultPage}`,
      fetchOptions
    );
    if (res.ok) {
      const data = await res.json();
      const { records, topics, ...rest } = data;
      return {
        props: {
          lookfor,
          topics,
          records: records.records,
          resultCount: records.resultCount,
          resultPage,
        },
      };
    }
    return {
      props: {
        lookfor,
        topics,
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
