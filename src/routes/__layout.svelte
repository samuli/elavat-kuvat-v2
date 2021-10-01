<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import '../app.postcss';
  import Header from '../components/Header.svelte';
  import { fade } from 'svelte/transition';

  import navigationState from '../stores/navigationState';
  import facets from '../stores/facets';
  import PageLoader from '../components/PageLoader.svelte';

  export const load: Load = async ({ fetch }) => {
    const facetsRes = await fetch('/api/topFacets.json');
    if (facetsRes.ok) {
      const facetData = await facetsRes.json();
      const keywords = [
        'suoratoisto',
        'lyhytelokuva',
        'mainos',
        'dokumentti',
        'video',
        'elokuva',
        'tv',
        'animaatio',
        'fiktio',
        'tietoisku',
        ...facetData.topics,
        ...facetData.genres,
      ];
      return {
        props: {
          keywords,
        },
        context: {
          topics: facetData.topics,
          genres: facetData.genres,
        },
      };
    }
    return { props: null };
  };
</script>

<script lang="ts">
  export let keywords = [];
</script>

<svelte:head>
  {#if keywords.length > 0}
    <meta name="keywords" content="{keywords.join(',')}" />
  {/if}
</svelte:head>

<div class="flex flex-col bg-gray-900 text-white align-center items-center min-h-screen">
  <div class="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline">
    {#if $navigationState === 'loading'}
      <div out:fade="{{ delay: 200 }}">
        <PageLoader />
      </div>
    {/if}
    <Header />
    <main class="mx-5">
      <slot />
    </main>
    <footer></footer>
  </div>
</div>

<svelte:window
  on:sveltekit:navigation-start="{() => {
    $navigationState = 'loading';
  }}"
  on:sveltekit:navigation-end="{() => {
    $navigationState = 'loaded';
  }}"
/>
