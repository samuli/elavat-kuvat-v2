<script lang="ts">
  import { browser } from '$app/env';
  import AutoComplete from 'simple-svelte-autocomplete';
  import { goto } from '$app/navigation';
  import { recordUrl } from '$lib/record';
  import { autocompleteUrl } from '$lib/api';
  async function searchFunction(lookfor) {
    const url = autocompleteUrl(lookfor, 20);
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK' || Number(data.resultCount) === 0) {
      return [];
    }
    return [
      { id: 0, title: `Näytä kaikki haulla ${lookfor} (${data.resultCount})` },
      ...data.records,
    ];
  }
  export let closeSearch;
  let selectedItem = null;
  let lookfor;
  let text;
  $: {
    if (browser && lookfor && lookfor !== '') {
      console.log('look', selectedItem);
      const location = window.location;
      const url = new URL(`${location.protocol}//${location.host}/search`);
      url.searchParams.set('lookfor', lookfor);
      goto(url.toString());
      closeSearch();
    }
  }
  $: {
    if (selectedItem !== null) {
      if (selectedItem.id === 0) {
        lookfor = text;
      } else {
        goto(recordUrl(selectedItem.id));
      }
      closeSearch();
    }
  }
</script>

<div id="autocomplete">
  <AutoComplete
    class="w-full"
    placeholder="Hae..."
    noResultsText="{`Ei tuloksia hakusanalla ${text}`}"
    createText="{`Ei tuloksia hakusanalla ${text}`}"
    delay="300"
    searchFunction="{searchFunction}"
    showLoadingIndicator="{true}"
    bind:selectedItem
    bind:text
    create="{true}"
    onCreate="{(term) => (lookfor = term)}"
    localFiltering="{false}"
    labelFieldName="title"
    loadingText="Haetaan..."
  >
    <span slot="item" let:item let:label>
      <div class="flex items-center">
        {#if item.id !== 0}
          <div class="w-10 h-8 overflow-hidden rounded-md">
            {#if item.images.length > 0}
              <div class="mr-1">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="{`https://api.finna.fi${item.images[0]}`}" width="{40}" />
              </div>
            {/if}
          </div>
        {/if}
        <div class="pl-1">
          <div class="text-md overflow-clip line-clamp-1">{item.title}</div>
        </div>
      </div>
    </span>
  </AutoComplete>
</div>

<style>
  #autocomplete :global(.autocomplete) {
    @apply w-full;
  }
  #autocomplete :global(.autocomplete-input) {
    height: 35px;
    @apply w-full px-4 py-1 rounded-lg text-lg text-gray-900 placeholder-gray-500 focus:outline-none ring-inset focus:ring-2 focus:ring-pink-500;
  }
  #autocomplete :global(.autocomplete-list) {
    @apply absolute w-full bg-gray-900 text-gray-100 border border-pink-500;
    max-width: 95%;
    margin-top: 40px;
    max-height: 85vh;
  }
  #autocomplete :global(.autocomplete-list-item) {
    @apply flex items-center p-1 hover:text-gray-100 text-gray-100;
    height: 40px;
  }
  #autocomplete :global(.autocomplete-list-item.selected) {
    @apply bg-pink-500 text-gray-100;
  }
</style>
