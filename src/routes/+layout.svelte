<script lang="ts">
	import '@voxelified/voxeliface/styles.scss';
	import Logo from '$lib/components/Logo.svelte';
	import { t } from '$lib/localization';
	import { Header } from '@voxelified/voxeliface';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;	

	$: ({ supabase } = data);
	onMount(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange(() =>
			invalidate('supabase:auth')
		);
		return () => subscription.unsubscribe();
	});
</script>

<div class="app theme-color">
	<Header>
		<a href="/" class="logo"><Logo/></a>
		<a href="/guides" class="nav-link">{$t('guides')}</a>
		<a href="/dashboard" class="nav-link">{$t('dashboard')}</a>
		{#if data.session}
			<form class="logout" action="logout" method="POST">
				<button>logout</button>
			</form>
		{/if}
	</Header>
	<main class="app-content">
		<slot/>
	</main>
	<footer>
		flake flake flake flake flake flake
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		min-height: 100vh;
		background: linear-gradient(-10deg, hsl(310 30% 40%) 15%, hsl(310 30% 60%) 75%);
		--theme-hue: 310;
		flex-direction: column;
	}
	:global(body) {
		overflow: hidden auto;
	}

	:global(header) {
		display: flex;
	}
	.logo {
		margin-right: 8px;
	}
	.nav-link {
		color: var(--color-primary);
		margin: 14px 12px;
		text-decoration: none;
	}
	form.logout {
		margin-left: auto;
	}

	footer {
		color: var(--color-secondary);
		padding: 48px 24px;
		margin-top: auto;
		background: var(--background-header);
	}
</style>