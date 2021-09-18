<script lang="ts">
  export let text: string;
  const parts = text.replace(/<br( )?\/>/g, '\n').split('\n');

  const collapse = parts.length > 1;
</script>

<div class="mt-4 leading-snug text-md">
  {#if collapse}
    <details>
      <summary class="cursor-pointer whitespace-pre-line outline-none">{parts[0]}</summary>
      {#if parts.length > 1}
        <div>
          {#each parts.slice(1) as el}
            <p class="pt-2">
              {el}
            </p>
          {/each}
        </div>
      {/if}
    </details>
  {/if}
  {#if !collapse}
    <p>{parts[0]}</p>
  {/if}
</div>
