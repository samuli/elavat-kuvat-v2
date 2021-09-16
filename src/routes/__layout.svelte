<script lang="ts">
  import '../app.postcss';
  import Header from '../components/Header.svelte';
</script>

<div class="flex flex-col bg-gray-900 text-white align-center items-center min-h-screen">
  <div class="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline">
    <Header />
    <main class="mx-5">
      <slot />
    </main>
    <footer />
  </div>
</div>
