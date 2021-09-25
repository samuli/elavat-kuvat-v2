<script lang="ts">
  import '../app.postcss';
  import Header from '../components/Header.svelte';
  import { fade } from 'svelte/transition';

  import navigationState from '../stores/navigationState';
  import PageLoader from '../components/PageLoader.svelte';
</script>

<div class="flex flex-col bg-gray-900 text-white align-center items-center min-h-screen">
  <div class="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline">
    {#if $navigationState === 'loading'}
      <div out:fade="{{ delay: 200 }}">
        <PageLoader />
      </div>
    {/if}
    <Header />
    <main class="mx-5">
      <slot />
    </main>
    <footer></footer>
  </div>
</div>

<svelte:window
  on:sveltekit:navigation-start="{() => {
    $navigationState = 'loading';
  }}"
  on:sveltekit:navigation-end="{() => {
    $navigationState = 'loaded';
  }}"
/>
