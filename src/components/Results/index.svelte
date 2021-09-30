<script type="ts">
  import { goto } from '$app/navigation';
  import FacetStripe from '../FacetStripe.svelte';
  import Pagination from '../Pagination/index.svelte';
  import ResultGrid from '../ResultGrid/index.svelte';
  import SearchHeading from '../SearchHeading.svelte';
  import type { IRecord } from '$lib/api';
  import { searchLimit } from '$lib/api';
  export let records: IRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  export let lookfor: string = '';
  export let heading: string = 'Haku: ';
  $: pageCount = Math.ceil(Number(resultCount) / searchLimit);
  const setPage = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    goto(url.toString());
  };
</script>

<div>
  <div class="flex justify-between h-8">
    <SearchHeading title="{heading}" value="{lookfor}" resultCount="{resultCount}" />
    {#if pageCount > 1}
      <Pagination setPage="{setPage}" page="{resultPage}" pageCount="{pageCount}" small="{true}" />
    {/if}
  </div>
  <FacetStripe facet="topic_facet" facets="{topics}" />
  <div class="mt-2">
    <ResultGrid records="{records}" />
  </div>
  <div class="mt-4 flex justify-center">
    {#if pageCount > 1}
      <Pagination setPage="{setPage}" page="{resultPage}" pageCount="{pageCount}" small="{false}" />
    {/if}
  </div>
</div>
