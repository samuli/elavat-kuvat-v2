<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowLeft as arrowLeft,
    faArrowRight as arrowRight,
  } from '@fortawesome/free-solid-svg-icons';
  import NaviButton from './NaviButton.svelte';
  import PageMenu from './PageMenu.svelte';
  export let page: number = 1;
  export let pageCount: number;
  export let small: boolean = false;
  export let setPage: (number) => void;

  $: pageIdxs = Array.from(Array(pageCount), (_el, i) => i + 1);
  $: disablePrev = page === 1;
  $: disableNext = page === pageCount;
</script>

<nav
  class="flex items-start items-center"
  aria-label="{`Hakutuloksen sivutus${small ? '' : ', sivun lopussa'}`}"
>
  <NaviButton
    disabled="{disablePrev}"
    aria-disabled="{disablePrev}"
    onClick="{() => setPage(page - 1)}"
    small="{small}"
  >
    <Fa icon="{arrowLeft}" />
  </NaviButton>
  <PageMenu
    activePage="{page}"
    items="{pageIdxs}"
    onPageSelect="{(page) => setPage(page)}"
    small="{small}"
  />
  <NaviButton
    disabled="{disableNext}"
    aria-disabled="{disableNext}"
    onClick="{() => setPage(page + 1)}"
    small="{small}"
  >
    <Fa icon="{arrowRight}" />
  </NaviButton>
</nav>
