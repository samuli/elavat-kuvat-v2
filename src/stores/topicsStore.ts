import { writable } from 'svelte/store';

type Topics = null | { url: string; topics: string[] };

export default writable<topicsStore>(null);
