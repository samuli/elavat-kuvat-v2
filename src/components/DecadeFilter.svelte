<script lang="ts">
  export let title: string = undefined;
  export let startYear: number = undefined;
  const endYear = startYear < 2000 ? startYear + 9 : '*';
</script>

<a href={`/browse?facet=date:${startYear}-${endYear}`}>
  <div
    class="text-md subpixel-antialiased text-gray-800  uppercase tracking-tight bg-gradient-to-b from-gray-100 to-gray-300 py-1 px-2 rounded-lg cursor-pointer ripple-bg-white"
  >
    {title}
  </div>
</a>
