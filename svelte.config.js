import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare-workers';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    hydrate: true,
    ssr: true,
    paths: {
      assets: 'https://static.elavatkuvat.fi/elavat-kuvat-v2/build',
    },
  },
};

export default config;
