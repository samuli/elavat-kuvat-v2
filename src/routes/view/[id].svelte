<script context="module" lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faExternalLinkAlt as ExtLinkIcon,
    faPlay as PlayIcon,
  } from '@fortawesome/free-solid-svg-icons';
  import type { Load } from '@sveltejs/kit';
  import { extractVideoUrls, recordUrl } from '../../lib/api';
  import { appTitle, loadPromises, searchPromise } from '../../lib/util';
  import type { IFacet } from '$lib/api';
  import { finnaRecordPage, getField as getRecordField } from '$lib/record';
  import FacetStripe from '../../components/FacetStripe.svelte';
  import SearchHeading from '../../components/SearchHeading.svelte';
  import Description from '../../components/record/Description.svelte';
  import Copyright from '../../components/record/Copyright.svelte';

  export const load: Load = async ({ page, fetch }) => {
    const url = recordUrl(page.params.id);
    const recordPromise = searchPromise(fetch, url);
    const [{ records }] = await loadPromises([recordPromise]); //res = await fetch(url);
    const videoUrls = extractVideoUrls(records[0]);
    const record = records[0];

    return {
      props: {
        record,
        videoUrls,
        topics: getRecordField(record, 'topic_facet') || [],
        genres: getRecordField(record, 'genre_facet') || [],
        description: record.rawData?.description || null,
        poster: record.images.length ? `https://api.finna.fi${record.images[0]}` : null,
      },
    };
  };
</script>

<script lang="ts">
  export let record = null;
  export let videoUrls = null;

  export let genres: IFacet[] = [];
  export let topics: IFacet[] = [];
  export let poster: string;
  let isMounted = false;
  let videoUrl = null;
  let videoPaused = true;
  let videoPlayer;

  onMount(async () => {
    isMounted = true;
    videoUrl = (videoUrls.length > 0 && videoUrls[0].src) || null;
  });
</script>

<svelte:head>
  <title>{record.title} | {appTitle}</title>
</svelte:head>
{#if isMounted === true && record}
  <div class="w-auto font-sans">
    <div class="mt-3">
      <article>
        <div class="flex flex-col w-full max-w-2xl">
          <div class="aspect-w-4 aspect-h-3 overflow-hidden">
            <div class="absolute z-10" class:hidden="{!videoPaused}">
              <div
                on:click="{() => {
                  videoPaused = false;
                  setTimeout(() => videoPlayer.play(), 200);
                }}"
                class="flex relative items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64"
              >
                <div class="w-full h-full">
                  <div>
                    {#if poster}
                      <img
                        alt="Esikatselukuva"
                        in:fade="{{ duration: 300 }}"
                        out:fade="{{ duration: 10 }}"
                        src="{poster}"
                        class="w-auto rouded-xl overflow-hidden object-cover object-center"
                      />
                    {/if}
                  </div>
                </div>
                <div
                  class="absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer"
                >
                  <div
                    class="flex items-center justify-center font-semibold text-lg px-4 py-3 rounded-xl bg-gradient-to-b from-pink-500 to-red-500 text-gray-100 border-2 border-red-500"
                  >
                    <span class="ml-2 flex items-center uppercase text-sm">
                      Katso <Fa class="ml-2" icon="{PlayIcon}" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class:hidden="{videoPaused}">
              {#if videoUrl}
                <vm-player
                  aspect-ratio="4:3"
                  viewType="video"
                  poster="{poster}"
                  autoplay="{true}"
                  controls
                  bind:this="{videoPlayer}"
                >
                  <vm-hls crossOrigin="">
                    <source data-src="{videoUrl}" type="application/x-mpegURL" />
                  </vm-hls>
                </vm-player>
              {/if}
            </div>
          </div>
          <div class="flex flex-col justify-center mt-2">
            <div>
              <h1 class="text-xl md:text-3xl font-bold">{record.title}</h1>
              <p class="text-md text-gray-100">
                {getRecordField(record, 'author_corporate')}
                {` ${getRecordField(record, 'main_date_str')}`}
              </p>
            </div>
            {#if record.urls && record.urls.length > 1}
              <ul class="mt-5">
                {#each extractVideoUrls(record) as url}
                  <li
                    on:click="{() => {
                      videoUrl = url.src;
                      videoPaused = false;
                    }}"
                    class="flex my-2 items-center group text-md text-gray-200 hover:text-white cursor-pointer"
                  >
                    <div
                      class="text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm"
                    >
                      <div class="ml-1">
                        <Fa icon="{PlayIcon}" />
                      </div>
                    </div>
                    <div class="ml-3">{url.title}</div>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
        <div class="max-w-2xl">
          {#if record.rawData?.description}
            <Description text="{record.rawData?.description}" />
          {/if}
          <div
            class="my-5 inline-flex flex-col sm:flex-row bg-yellow-50 text-gray-900 p-3 rounded-md"
          >
            {#if record.buildings}
              <div class="flex flex-col">
                <div class="mr-2 uppercase text-xs font-bold">Aineiston tarjoaa:</div>
                <div class="flex text-sm">
                  <a
                    href="https://kavi.finna.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center underline hover:text-gray-700"
                  >
                    {record.buildings[0].translated}
                    <span class="ml-2 mr-5 text-gray-700 text-xs">
                      <Fa icon="{ExtLinkIcon}" />
                    </span>
                  </a>
                </div>
              </div>
            {/if}
            <div class="sm:mt-0 mt-2">
              <Copyright record="{record}" />
            </div>
          </div>
          <div>
            {#if topics.length > 0}
              <div class="mb-2">
                <SearchHeading title="Aiheet" />
                <FacetStripe truncate="{false}" facet="topic_facet" facets="{topics}" />
              </div>
            {/if}
            {#if genres.length > 0}
              <div>
                <SearchHeading title="Genret" />
                <FacetStripe truncate="{false}" facet="genre_facet" facets="{genres}" />
              </div>
            {/if}
          </div>
        </div>
      </article>
    </div>
  </div>
{/if}
