<script lang="ts" context="module">
  import '../app.postcss';
  import Header from '../components/Header.svelte';
  import { fade } from 'svelte/transition';

  import navigationState from '../stores/navigationState';
  import PageLoader from '../components/PageLoader.svelte';
</script>

<svelte:head>
  <meta
    name="keywords"
    content="suoratoisto,lyhytelokuva,mainos,dokumentti,video,elokuva,tv,animaatio,fiktio,tietoisku,Helsinki,autot,vaatteet,kirkkorakennukset,Lappi,henkilöautot,elintarvikkeet,laivat,rakentaminen,satamat,Suomi,tehtaat,urheilu,lapset,kahvi,kalastus,patsaat,pankit,matkailu,virvoitusjuomat,juhlat,muoti,nuoret,hygienia,hiihto,maatalous,ravintolat,Tampere,liikenne,pesuaineet,dokumentti,mainos,esittelyelokuva,ajankohtaisdokumentti,alueellinen kuvaus,tilauselokuva,teollisuusdokumentti,urheiludokumentti,kotiseutuelokuva,ammatinkuvaus,juhlaelokuva,valistuselokuva,kansatieteellinen elokuva,animaatio,fiktio &amp; dokumentti,fiktio,henkilödokumentti,matkailuelokuva,draamadokumentti,sotadokumentti,tv-tuotanto,opetuselokuva,maatalousdokumentti,historiallinen dokumentti,tiedotuselokuva,yhteiskunnallinen dokumentti,perinne-elokuva,tietoisku,musiikkidokumentti,taidedokumentti"
  />
</svelte:head>

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
