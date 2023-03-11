import { redirect } from '@sveltejs/kit';
import { VERCEL_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
export const load = (async ({ locals: { getSession }}) => {
	const session = await getSession();
	if (session)
		throw redirect(303, '/dashboard');

	return {
		redirectUrl: `http${VERCEL_URL ? `s://${VERCEL_URL}` : '://localhost:5173'}/login`
	};
}) satisfies PageServerLoad;