<script>
  // from https://dev.to/shajidhasan/add-a-youtube-like-page-loading-animation-in-sveltekit-58kp
  import { onDestroy, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import navigationState from '../stores/navigationState';

  const progress = tweened(0, {
    duration: 3500,
    easing: cubicOut,
  });
  const unsubscribe = navigationState.subscribe((state) => {
    if (state === 'loaded') {
      progress.set(1, { duration: 200 });
    }
  });
  onMount(() => {
    progress.set(0.7);
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="progress-bar">
  <div
    class="progress-sliver bg-pink-500 h-full"
    style="{`transform: translate3d(-${(1 - $progress) * 100}%, 0px, 0px); --width: ${
      $progress * 100
    }%`}"
  ></div>
</div>

<style>
  .progress-bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
  }
</style>
