import type { Database } from '../app';
import type { LayoutLoad } from './$types';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth');
	const supabase = createSupabaseLoadClient<Database, 'flake'>({
		event: { fetch },
		options: { db: { schema: 'flake' } },
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		serverSession: data.session
	});

	const { data: { session } } = await supabase.auth.getSession();
	return { session, supabase };
}) satisfies LayoutLoad;