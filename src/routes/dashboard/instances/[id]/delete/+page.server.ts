import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
export const prerender = false;
export const actions = {
	async default({ params, locals: { supabase } }) {
		await supabase.from('cloud_instances').delete().eq('id', params.id);
		throw redirect(303, '/dashboard/instances');
	}
} satisfies Actions;