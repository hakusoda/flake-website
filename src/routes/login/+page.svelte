<script lang="ts">
	import { t } from '$lib/localization';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	const redirect = async () => {
		await data.supabase.auth.signInWithOAuth({
			options: { redirectTo: data.redirectUrl },
			provider: 'github'
		});
	};

	if ($page.data.session)
		window.location.href = '/dashboard';
</script>

{#if !$page.data.session}
	<div class="btn-container">
		<button class="login-btn" on:click={redirect}>{$t('login.github')}</button>
	</div>
{/if}

<style lang="scss">
	.btn-container {
		margin: 8rem 0;
		display: flex;
		justify-content: center;
	}

	.login-btn {
		color: #fff;
		width: 256px;
		border: none;
		cursor: pointer;
		padding: 12px 24px;
		font-size: 1.2em;
		text-align: center;
		box-shadow: 0 8px 16px 0 #0000001a;
		background: var(--background-primary);
		font-weight: 600;
		user-select: none;
		font-family: var(--font-tertiary);
		border-radius: 8px;
		text-decoration: none;
		&:hover {
			background: var(--background-header);
		}
	}
</style>