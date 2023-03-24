import { error } from '@sveltejs/kit';
import type { Database } from '../../../../app';
import type { PageServerLoad } from './$types';
export const load = (async ({ params, locals: { supabase } }) => {
	const instances = await supabase.from('cloud_instances').select('id, access_key').eq('id', params.id);
	if (instances.error)
		throw error(500, instances.error.message);
	if (!instances.data.length)
		throw error(404, 'Instance does not exist.');

	const { data: servers } = await supabase.from('active_servers').select().eq('instance_id', params.id) as { data: Server[] };
	if (!servers)
		throw error(500);

	const universes = [...new Set(servers.map(s => s.universe_id))];
	if (universes.length > 0) {
		const { data }: { data: Universe[] } = await (await fetch(`https://games.roblox.com/v1/games?universeIds=${Object.values(universes).join(',')}`)).json();
		const { data: icons }: { data: any[] } = await (await fetch(`https://thumbnails.roblox.com/v1/games/icons?size=128x128&format=Png&universeIds=${data.map(p => p.id).join(',')}`)).json();
		for (const icon of icons)
			data.find(u => u.id === icon.targetId)!.icon = icon.imageUrl;
		for (const server of servers)
			server.game = data.find(s => server.universe_id === s.id);
	}

	return { item: instances.data[0], servers };
}) satisfies PageServerLoad;

type Server = Database['flake']['Tables']['active_servers']['Row'] & { game?: Universe }
interface Universe {
	id: number
	name: string
	icon: string
	creator: {
		name: string
	}
}