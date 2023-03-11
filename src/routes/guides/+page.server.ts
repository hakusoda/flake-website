import type { ModuleData } from '../feed.json/+server';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const load = (() => {
	const modules: Record<string, ModuleData> = import.meta.glob('./**/*.md', { eager: true });
	return {
		items: Object.entries(modules).map(([path, { metadata }]) => ({
			url: 'guides' + path.slice(1, -9),
			date: metadata.date,
			tags: metadata.tags.split('|'),
			title: metadata.title,
			summary: metadata.summary,
			authors: metadata.authors.split(', ')
		}))
	};
}) satisfies PageServerLoad;