<script lang="ts">
  export let level: number = 1;
  export let text: string = '';
  export let classes: string = undefined;
  export let onClick: () => void;
</script>

{#if level === 1}
  <h1 class={classes} {onClick}>
    {text}
  </h1>
{/if}
<h3 class={classes} {onClick}>
  {text}
</h3>
