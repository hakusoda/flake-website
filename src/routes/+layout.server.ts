import type { LayoutServerLoad } from './$types';
export const load = (async ({ locals: { getSession } }) =>
	({ session: getSession() })) satisfies LayoutServerLoad;