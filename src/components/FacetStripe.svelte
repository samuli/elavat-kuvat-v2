<script type="ts">
  import { fade } from 'svelte/transition';
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
  class:h-[6em]="{truncate}"
  class="items-center w-full mt-2"
>
  <ul>
    {#each facets as f}
      <div class="facet" in:fade="{{ delay: 200 }}">
        <a href="{facetBrowseUrl(facet, f)}">
          <li class="px-2 py-1">
            {f}
          </li>
        </a>
      </div>
    {/each}
  </ul>
</div>

<style>
  .facet {
    @apply inline-flex flex-auto mb-2 mr-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 cursor-pointer whitespace-nowrap;
  }
</style>
