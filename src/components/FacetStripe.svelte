<script type="ts">
  import { facetBrowseUrl } from '$lib/util';

  // import { facetBrowseUrl } from '../lib/util';
  //
  export let facet: string = undefined;
  export let facets: string[] = [];
  // export let facetBrowseUrl = typeof facetBrowseUrl;
  export let truncate = true;
</script>

<div
  class:line-clamp-3="{truncate}"
  class:overflow-clip="{truncate}"
  class="mt-1 items-center w-full"
>
  <ul>
    {#each facets as f}
      <a href="{facetBrowseUrl(facet, f)}">
        <li class="facet">
          {f}
        </li>
      </a>
    {/each}
  </ul>
</div>

<style>
  .facet {
    @apply inline-flex flex-auto mr-1 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 cursor-pointer whitespace-nowrap;
  }
</style>
