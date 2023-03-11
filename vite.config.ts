import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
export default {
	define: {
		'process.env': process.env,
	},
	plugins: [sveltekit()]
} satisfies UserConfig;