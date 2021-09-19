<script type="ts">
  import { goto } from '$app/navigation';
  import FacetStripe from '../FacetStripe.svelte';
  import Pagination from '../Pagination/index.svelte';
  import ResultGrid from '../ResultGrid/index.svelte';
  import type { IRecord } from '$lib/api';
  import { searchLimit } from '$lib/api';
  export let records: IRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  $: pageCount = Math.ceil(Number(resultCount) / searchLimit);
  const setPage = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    goto(url.toString());
  };
</script>

<div>
  <FacetStripe facet="topic_facet" facets="{topics}" />
  <Pagination setPage="{setPage}" page="{resultPage}" pageCount="{pageCount}" small="{true}" />
  <ResultGrid records="{records}" />
</div>
