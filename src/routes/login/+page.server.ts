import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const VERCEL_URL = process.env.VERCEL_URL;
export const load = (async ({ locals: { getSession }}) => {
	const session = await getSession();
	if (session)
		throw redirect(303, '/dashboard');

	return {
		redirectUrl: `http${VERCEL_URL ? `s://${VERCEL_URL}` : '://localhost:5173'}/login`
	};
}) satisfies PageServerLoad;