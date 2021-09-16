<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { extractVideoUrls, recordUrl } from '../../lib/api';

  export const load: Load = async ({ page, fetch }) => {
    const url = recordUrl(page.params.id);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const videoUrls = extractVideoUrls(data.records[0]);
      return {
        props: { record: data.records[0], videoUrls },
      };
    }

    const { statusMessage } = await res.json();

    return {
      error: new Error(statusMessage),
    };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let record = null;
  export let videoUrls = null;

  let isMounted = false;
  let video;
  let Player;
  let Hls;
  let videoUrl = null;

  onMount(async () => {
    const vime = await import('@vime/svelte');
    Player = vime.Player;
    Hls = vime.Hls;
    isMounted = true;
    setTimeout(() => {
      video.play(); // ;
    }, 500);
  });
  let hlsConfig = {};
</script>

{#if isMounted === true && record}
  <p>{record.title}</p>
  <svelte:component this={Player} bind:this={video} autoplay controls>
    <svelte:component this={Hls} version="latest" config={hlsConfig} crossorigin="">
      <source data-src={videoUrls[0].src} type="application/x-mpegURL" />
    </svelte:component>
  </svelte:component>
{/if}
