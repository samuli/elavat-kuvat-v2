<script type="ts">
  import { goto } from '$app/navigation';
  import FacetStripe from '../FacetStripe.svelte';
  import Pagination from '../Pagination/index.svelte';
  import ResultGrid from '../ResultGrid/index.svelte';
  import { _iRecord as iRecord, _iFacet as iFacet, searchLimit } from '$lib/api';
  export let records: iRecord[] = [];
  export let resultCount: number = 0;
  export let topics: string[] = [];
  export let resultPage: number;
  $: pageCount = Math.ceil(Number(resultCount) / searchLimit);
  const setPage = (page) => {
    goto(`${window.location.pathname}?page=${page}`);
  };
</script>

<div>
  <FacetStripe facet="topic_facet" facets="{topics}" />
  <Pagination setPage="{setPage}" page="{resultPage}" pageCount="{pageCount}" small="{true}" />
  <ResultGrid records="{records}" />
</div>
