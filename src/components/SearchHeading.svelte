<script lang="ts">
  export let title = '';
  export let value = '';
  export let resultCount = undefined;
</script>

<div class="flex items-center justify-between h-8">
  <h1 class:mr-2="{title}" class="unstyled leading-tight">
    {title} <span class="font-normal text-gray-200">{value}</span>
  </h1>
  {#if resultCount}
    <div>
      <div class="mr-2 text-sm text-gray-200 leading-tight">
        ({resultCount}
        <span class="sm:inline hidden"> elokuvaa</span>)
      </div>
    </div>
  {/if}
</div>
