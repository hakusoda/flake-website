import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load = (async ({ parent }) => {
	const { supabase } = await parent();
	const { data, error: derror } = await supabase.from('cloud_instances').select('id');
	if (derror)
		throw error(500);
	return { instances: data };
}) satisfies PageLoad;