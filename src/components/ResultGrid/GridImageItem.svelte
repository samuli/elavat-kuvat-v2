<script lang="ts">
  import { fade } from 'svelte/transition';
  export let imageUrl: string = '';
  export let title: string = undefined;
  const getImgUrl = (url: string) => `https://api.finna.fi${url}&w=300`;

  let currentUrl;
  let loadingUrl;
  let resetImg = false;

  $: {
    loadingUrl = imageUrl;
  }
  const lazy = (node, data) => {
    const img = new Image();
    img.onload = () => {
      currentUrl = getImgUrl(data.src);
      loadingUrl = null;
      resetImg = !resetImg;
    };
    resetImg != !resetImg;
    currentUrl = null;

    img.src = getImgUrl(data.src);
    return {
      destroy() {}, // noop
    };
  };
</script>

<div class="bg-gray-800">
  <div class="rounded-sm aspect-w-5 aspect-h-4 h-full">
    <div class="overflow-hidden h-full">
      {#key resetImg}
        {#if currentUrl}
          <img
            class="object-none object-center h-full"
            in:fade="{{ duration: 300 }}"
            out:fade="{{ duration: 100 }}"
            src="{currentUrl}"
            alt="Esikatselukuva"
          />
        {/if}
      {/key}
      <!-- svelte-ignore a11y-missing-attribute -->
      {#if loadingUrl}
        <img
          use:lazy="{{ src: loadingUrl }}"
          class="absolute top-0 hidden opacity-0"
          style="width:0px;height:0px"
        />
      {/if}
    </div>
  </div>
  <div
    class="py-2 px-3 text-center text-gray-200 truncate text-center text-xs overflow-ellipsis group-hover:text-white"
  >
    {#if currentUrl && title}
      <div class="self-end">{title}</div>
    {:else}
      <div class="self-end">&nbsp;</div>
    {/if}
  </div>
</div>
