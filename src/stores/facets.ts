import { writable } from 'svelte/store';

type facets = {
  topics: string[];
  genres: string[];
};

export default writable<facets>({ topics: [], genres: [] });
