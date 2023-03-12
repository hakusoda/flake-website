import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (!session)
		throw redirect(303, '/login');

	const data = await (await fetch(`${PUBLIC_SUPABASE_URL}/rest/v1/user_flags?select=flake_beta&user_id=eq.${session.user.id}`, {
		headers: {
			apikey: PUBLIC_SUPABASE_ANON_KEY,
			authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`,
			'accept-profile': 'public'
		}
	})).json();
	if (!data?.[0]?.flake_beta)
		throw redirect(303, '/beta');
}) satisfies LayoutLoad;