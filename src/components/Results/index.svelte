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
  $: pageCount = Math.ceil(Number(resultCount) / searchLimit);
  const setPage = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    goto(url.toString());
  };
</script>

<div>
  <div class="flex justify-between h-8">
    <SearchHeading title="Haku:" value="{lookfor}" resultCount="{resultCount}" />
    <Pagination setPage="{setPage}" page="{resultPage}" pageCount="{pageCount}" small="{true}" />
  </div>
  <FacetStripe facet="topic_facet" facets="{topics}" />
  <ResultGrid records="{records}" />
</div>
