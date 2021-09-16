<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  import { goto } from '$app/navigation';
  import BrandHeading from './BrandHeading.svelte';
  import { appSubtitle, appTitle } from '$lib/util';
  let showSearch: boolean = false;
  let showAutocomplete: boolean = false;
  export let frontpage: boolean = false;
</script>

<header class="z-10 flex flex-col sticky top-0 px-5 pt-2 pb-1 shadow-xl bg-gray-900">
  <div class="flex items-center justify-between">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="flex flex-wrap items-end align-center text-pink-500 stroke-current text-white">
        <a href="/">
          <BrandHeading
            level={frontpage ? 1 : 3}
            onClick={() => {
              showAutocomplete = false;
              goto('/');
            }}
            classes="text-3xl bg-gradient-to-t from-red-500 to-pink-500 text-transparent bg-clip-text sm:text-5xl mr-2 overflow-hidden whitespace-nowrap font-bold active:from-pink-500 cursor-pointer unstyled"
            text={appTitle}
          />
          <BrandHeading
            level={frontpage ? 1 : 3}
            classes="flex items-end text-md sm:text-lg font-serif text-gray-100 italic whitespace-nowrap -mt-1 unstyled"
            text={appSubtitle}
            onClick={() => 1}
          />
        </a>
      </div>
    </div>
    {#if !showSearch}
      <div
        role="button"
        title="Hae..."
        class="cursor-pointer ml-2"
        onClick={() => (showAutocomplete = true)}
      >
        <Fa
          icon={faSearch}
          style="width: '20px'; height: '20px'"
          class="hover:text-pink-500 text-gray-100"
        />
      </div>
    {/if}
  </div>
  <div>autocomplete</div>
</header>
