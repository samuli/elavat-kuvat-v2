<script lang="ts">
  export let imageUrl: string = '';
  export let title: string = undefined;
</script>

<div style="backgroundColor: 'rgb(21, 30, 50)'">
  <div class="flex. rounded-sm aspect-w-5 aspect-h-4 h-full">
    <div class="overflow-hidden h-full">
      {#if imageUrl}
        <img
          class="object-none object-center h-full"
          src={`https://api.finna.fi${imageUrl}&w=300`}
          alt="Esikatselukuva"
        />
      {/if}
    </div>
  </div>
  <div
    class="py-2 px-3 text-center text-gray-200 truncate text-center text-xs overflow-ellipsis group-hover:text-white"
  >
    {#if title}
      <div class="self-end">{title}</div>
    {:else}
      <div class="self-end">&nbsp;</div>
    {/if}
  </div>
</div>
