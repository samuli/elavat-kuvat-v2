<script context="module" lang="ts">
  import { browser } from '$app/env';
  import type { Load } from '@sveltejs/kit';
  import { frontPageUrl } from '../lib/api';
  import SearchHeading from '../components/SearchHeading.svelte';
  import FacetStripe from '../components/FacetStripe.svelte';
  import DecadeFilters from '../components/DecadeFilters.svelte';
  import ResultGrid from '../components/ResultGrid/index.svelte';
  import { decades, searchPromise } from '$lib/util';
  import navigationState from '../stores/navigationState';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faRedoAlt as ReloadIcon } from '@fortawesome/free-solid-svg-icons';

  export const load: Load = async ({ fetch }) => {
    let url = frontPageUrl();
    if (browser) {
      const el = document.getElementById('random-clips-url');
      if (el) {
        url = el.getAttribute('data-url');
      }
    }
    const fetchRandomClips = searchPromise(fetch, url);
    const { records } = await fetchRandomClips;

    let topics = await fetch('/topFacets.json?facet=topic');
    topics = await topics.json();

    let genres = await fetch('/topFacets.json?facet=genre');
    genres = await genres.json();

    return {
      props: {
        genres,
        randomClips: records,
        randomClipsUrl: url,
        topics,
      },
    };
  };
</script>

<script lang="ts">
  export let topics = [];
  export let genres = [];
  export let randomClips = [];
  export let randomClipsUrl = '';
  const reloadClips = async () => {
    console.log('reload');
    $navigationState = 'loading';
    const { records } = await searchPromise(fetch, frontPageUrl());
    $navigationState = 'loaded';
    randomClips = records;
  };
</script>

<!-- prettier-ignore -->
<svelte:head>
  <title>Home</title>
  {@html
  `
    <meta id="random-clips-url" data-url="${randomClipsUrl}"></script>
    `
  }
</svelte:head>

<section>
  <div class="pt-2 w-full">
    <div class="flex flex-col flex-wrap md:flex-nowrap">
      <SearchHeading title="Yleisimmät aiheet" />
      <div class="h-16 min-h-32 w-full mt-1 mb-3">
        <FacetStripe facet="topic_facet" facets="{topics}" truncate="{true}" />
      </div>
      <div class="w-full">
        <div class="flex flex-col flex-wrap md:flex-nowrap">
          <div class="mt-6">
            <div class="flex flex-col text-center">
              <div class="flex items-center mb-1">
                <SearchHeading title="Poimintoja" />
                <div
                  class="cursor-pointer active:text-pink-500"
                  title="Näytä lisää"
                  onClick="{() => {}}"
                >
                  <button on:click="{reloadClips}"
                    ><Fa class="inline-block" icon="{ReloadIcon}" /></button
                  >
                </div>
              </div>
              <ResultGrid records="{randomClips}" />
              <a href="/browse/clips/all">
                <div
                  role="button"
                  class="inline-flex mt-6 mb-4 py-3 px-4 text-md subpixel-antialiased font-medium tracking-tight rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer bg-gradient-to-b from-gray-100 to-gray-300 ripple-bg-white"
                >
                  <div class="flex justify-center items-center">
                    <div class="inline-flex">Selaa elokuvia</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div>
            <SearchHeading title="Aikakausi" />
            <DecadeFilters items="{decades}" />
          </div>
          <div class="mt-2">
            <SearchHeading title="Genret" />
            <FacetStripe truncate="{false}" facet="genre_facet" facets="{genres}" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
