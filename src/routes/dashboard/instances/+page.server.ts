import type { Actions } from './$types';
export const actions = {
	default: async ({ locals: { supabase, getSession }}) => {
		const session = await getSession();
		if (session)
			await supabase.from('cloud_instances').insert({
				owner: session.user.id
			});
	}
} satisfies Actions;