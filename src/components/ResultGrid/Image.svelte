<script lang="ts">
  export let src: string = undefined;
  export let width: number = 300;
  export let style: Record<string, unknown> = {};
</script>

<img
  src={`https://api.finna.fi${src}&w=${width}`}
  class="w-auto rouded-xl overflow-hidden"
  alt="Esikatselukuva"
  {style}
/>
