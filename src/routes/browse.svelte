<script context="module" lang="ts">
  import Results from '../components/Results/index.svelte';
  import { appTitle, fetchOptions } from '$lib/util';
  import type { IRecord } from '$lib/api';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const [facetKey,facetValue] = page.query.get("facet").split(":"); //params.facet;
    const resultPage = Number(page.query.get('page') || 1);
    console.log([facetKey,facetValue])
    console.log(`/api/browse/${facetKey}/${facetValue}.json?page=${resultPage}`)
    const res = await fetch(
      `/api/browse/${facetKey}/${facetValue}.json?page=${resultPage}`,
      fetchOptions
    );
    if (res.ok) {
      const { records, resultCount, topics } = await res.json();
      let heading = '';
      switch (facetKey) {
        case 'topic':
          heading = 'Aihe';
          break;
        case 'genre':
          heading = 'Genre';
          break;
        case 'date':
          heading = 'Aikakausi';
          break;
        case 'clips':
          heading = 'Selaa elokuvia';
          break;
      }

      let title = facetKey !== 'clips' ? `${heading}: ${facetValue}` : heading;
      return {
        props: {
          topics,
          records,
          resultCount,
          resultPage,
          heading,
          title,
        },
      };
    }
  };
</script>

<script lang="ts">
  export let records: IRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  export let heading: string;
  export let title: string;
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
