<script lang="ts">
	import XIcon from '$lib/components/XIcon.svelte';
	import FlakeIcon from '$lib/components/Logo.svelte';
	import { Button } from '@voxelified/voxeliface';
	import PeopleIcon from '$lib/components/PeopleIcon.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showKey = false;
	async function shutdownServer(id: number) {
		await data.supabase.from('active_servers').update({ shutdown: true }).eq('id', id);
	}

	onMount(() => {
		const channel = data.supabase
			.channel('any')
			.on('postgres_changes', { event: '*', table: 'active_servers', schema: 'flake' }, event => {
				if (event.eventType === 'INSERT')
					data.servers.push(event.new as any);
				else if (event.eventType === 'UPDATE') {
					const server = data.servers[data.servers.findIndex(s => s.id === event.new.id)];
					const newData = event.new;
					server.players, server.shutdown = newData.players, newData.shutdown;
				} else if (event.eventType === 'DELETE')
					data.servers = data.servers.filter(s => s.id !== event.old.id);
			})
			.subscribe();
		return () => data.supabase.removeChannel(channel);
	});
</script>

<div class="instance">
	<h1>Instance {data.item.id}</h1>
	<p>access key</p>
	<div class="key">
		<input type="text" title="access key" value={showKey ? data.item.access_key : 'hidden'} readonly>
		<button type="button" on:click={() =>
			showKey ? navigator.clipboard.writeText(data.item.access_key) : showKey = true
		}>{showKey ? 'copy' : 'reveal'}</button>
	</div>

	<div class="servers">
		<h2>Connected Servers</h2>
		{#each data.servers as server}
			<div class="server">
				<div class="game-info">
					<img src={server.game?.icon} alt="Experience Icon" width="64" height="64"/>
					<div class="info-text">
						<h5>{server.game?.name}</h5>
						<p>by @{server.game?.creator.name}</p>
					</div>
				</div>
				<div class="info-list">
					<div class="info">
						<PeopleIcon size={24}/>
						<div class="info-text">
							<h5>Players</h5>
							<p>{server.players.length} Connected</p>
						</div>
					</div>
					<div class="info">
						<FlakeIcon size={30}/>
						<div class="info-text">
							<h5>flake</h5>
							<p>v{server.flake_version}</p>
						</div>
					</div>
				</div>
				<div class="buttons">
					<Button disabled={server.shutdown} on:click={() => shutdownServer(server.id)}>
						<XIcon/>
						Close Server
					</Button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.instance {
		padding: 1rem 4rem;
		border-radius: 8px;
		margin-bottom: 16px;

		p {
			margin: 8px 0 0 0;
			font-size: 14px;
		}
		.key {
			margin-top: 4px;
		}
		.servers {
			margin-top: 4rem;
			.server {
				padding: 16px;
				background: var(--background-secondary);
				border-radius: 24px;
				margin-bottom: 16px;
				.game-info {
					display: flex;
					align-items: center;
					margin-right: 3rem;
					p {
						font-size: 14px;
					}
					h5 {
						font-size: 20px;
						font-weight: 600;
					}
					img {
						border-radius: 8px;
					}
				}
				.info-list {
					display: flex;
					.info {
						display: flex;
						margin-top: 16px;
						align-items: center;
						margin-right: 3rem;
					}
				}
			}
		}
		.buttons {
			margin-top: 2rem;
		}
	}

	.info-text {
		margin-left: 16px;
		p {
			color: var(--color-tertiary);
			margin: 0;
			font-size: 12px;
		}
		h5 {
			margin: 0 0 4px;
			font-size: 16px;
			font-weight: 500;
		}
	}
</style>