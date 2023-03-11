import type { LayoutServerLoad } from './$types';
export const load = (async ({ locals: { getSession } }) =>
	({ session: await getSession() })) satisfies LayoutServerLoad;