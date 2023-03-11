import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load = (async ({ parent }) => {
	if (!(await parent()).session)
		throw redirect(303, '/login');
}) satisfies PageLoad;