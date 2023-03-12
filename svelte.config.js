import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess({}),
		vitePreprocess(),
		mdsvex({
			layout: { guides: 'src/routes/guides/guide.svelte' },
			extensions: ['.md']
		})
	]
};