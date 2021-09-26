<script lang="ts">
  import { onDestroy } from 'svelte';
  import navigationState from '../stores/navigationState';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  import { goto } from '$app/navigation';
  import BrandHeading from './BrandHeading.svelte';
  import { appSubtitle, appTitle } from '$lib/util';
  let showSearch: boolean = false;
  export let frontpage: boolean = false;

  let loadedAutocomplete;
  let loadAutocomplete = () => {
    import('./Autocomplete.svelte').then((m) => (loadedAutocomplete = m.default));
  };
  const unsubscribe = navigationState.subscribe((state) => {
    if (state === 'loading') {
      showSearch = false;
    }
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<header class="flex flex-col top-0 px-5 pt-2 pb-1 shadow-xl bg-gray-900">
  <div class="flex items-center justify-between">
    <div class="flex flex-col md:flex-row justify-between">
      <a href="/">
        <div class="flex flex-wrap items-end align-center text-pink-500 stroke-current text-white">
          <BrandHeading
            level="{frontpage ? 1 : 3}"
            onClick="{() => {
              showSearch = false;
              goto('/');
            }}"
            classes="text-3xl bg-gradient-to-t from-red-500 to-pink-500 text-transparent bg-clip-text sm:text-5xl mr-2 overflow-hidden whitespace-nowrap font-bold active:from-pink-500 cursor-pointer unstyled"
            text="{appTitle}"
          />
          <BrandHeading
            level="{frontpage ? 1 : 3}"
            classes="flex items-end text-md sm:text-lg font-serif text-gray-100 italic whitespace-nowrap -mt-1 unstyled"
            text="{appSubtitle}"
            onClick="{() => 1}"
          />
        </div>
      </a>
    </div>
    {#if !showSearch}
      <div
        role="button"
        title="Hae..."
        class="cursor-pointer ml-2"
        on:click="{() => (showSearch = true)}"
      >
        <Fa
          icon="{faSearch}"
          style="width: '20px'; height: '20px'"
          class="hover:text-pink-500 text-gray-100"
        />
      </div>
    {/if}
  </div>
  {#if showSearch}
    {#await loadAutocomplete()}
      <p>Hetki....</p>
    {:then}
      <svelte:component this="{loadedAutocomplete}" closeSearch="{() => (showSearch = false)}" />
    {/await}
  {/if}
</header>
