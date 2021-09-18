<script context="module" lang="ts">
  import { finnaRecordPage } from '$lib/record';
  import type { IRecord } from '$lib/api';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faExternalLinkAlt as ExtLinkIcon } from '@fortawesome/free-solid-svg-icons';
</script>

<script lang="ts">
  export let record: IRecord;
  const recordPageUrl = finnaRecordPage(record.recordPage);
  const copyright = record.imageRights?.copyright;
  const url = record.imageRights?.link || recordPageUrl;
  console.log(record);
</script>

<div class="flex flex-col">
  <span class="uppercase text-xs font-bold">Aineiston käyttöoikeudet: </span>
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="{recordPageUrl}"
    class="hover:text-gray-800"
    title="Katso lisätiedot Finnassa"
  >
    <div class="text-sm flex flex-row items-center">
      {#if copyright && url}
        <div class="underline">
          <a href="{url}" target="_blank" rel="noopener noreferrer">{copyright}</a>
        </div>
      {/if}
      <div class="text-gray-600 ml-1 flex jusitfy-center items-center text-xl">
        <span class="text-xs ml-2 ">
          <Fa icon="{ExtLinkIcon}" />
        </span>
      </div>
    </div>
  </a>
</div>
