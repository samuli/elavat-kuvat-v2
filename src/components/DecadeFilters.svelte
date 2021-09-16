<script lang="ts">
  import { yearTitle } from '../lib/util';
  import DecadeFilter from './DecadeFilter.svelte';
  export let items: number[] = [];
</script>

<ul class="flex flex-wrap mt-2">
  {#each items as year}
    <li class="mr-2 mb-2">
      <DecadeFilter startYear={year} title={yearTitle(year)} />
    </li>
  {/each}
</ul>
