<script lang="ts">
  export let items: number[] = [];
  export let activePage: number = 1;
  export let onPageSelect: (number) => void;
  export let small: boolean = false;
  let value: number = activePage;
  let classes =
    '-appearance-none outline-none w-auto border bg-gray-100 border-gray-400 rounded-md text-gray-900 cursor-pointer';
  if (!small) {
    classes += ' mx-3 px-3 py-2 text-md';
  }
  if (small) {
    classes += ' mx-1 px-1 py-1 text-xs';
  }
</script>

<select
  on:change="{(e) => onPageSelect(e.target.value)}"
  aria-label="Siirry sivulle"
  class="{classes}"
  bind:value
>
  {#each items as item}
    <option selected="{item === activePage}" disabled="{(activePage || 0) === item}" value="{item}">
      Sivu {item}
    </option>
  {/each}
</select>
