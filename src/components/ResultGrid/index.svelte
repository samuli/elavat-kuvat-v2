<script type="ts">
  // import Image from './Image.svelte';
  import GridImageItem from './GridImageItem.svelte';
  import GridItem from './GridItem.svelte';
  import type { IRecord } from '../../lib/api';
  export let records: IRecord[] = [];
</script>

<div>
  <ul class="flex flex-row flex-wrap overflow-hidden.">
    {#each records as rec}
      <GridItem>
        <a class="flex flex-col" href="{`/view/${encodeURIComponent(rec.id)}`}">
          <GridImageItem
            imageUrl="{(rec?.images && rec.images[0]) || undefined}"
            title="{rec.title}"
          />
        </a>
      </GridItem>
    {/each}
  </ul>
</div>
