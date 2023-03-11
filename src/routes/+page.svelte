<script lang="ts">
	import { t } from '$lib/localization';
</script>

<div class="landing">
	<h1 class="header">flake</h1>
	<p class="summary">A simple, modern & experimental Roblox Admin System.</p>
	<a class="download" href="/guides/getting-started">
		{$t('home.download')}
		<p>{$t('home.download.platform')}</p>
	</a>
</div>

<div class="features">
	<h1>{$t('home.features')}</h1>
	featureless
</div>

can't believe that there's nothing here

<style lang="scss">
	.landing {
		display: flex;
		align-items: center;
		padding-bottom: 40vh;
		flex-direction: column;
	}

	.header {
		margin: 64px 0 0;
		font-size: 3em;
	}
	.summary {
		margin: 16px 0 32px;
		font-size: 1.2em;
	}

	.download {
		color: #fff;
		width: 256px;
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
	.download p {
		margin: 2px 0 0;
		font-size: 12px;
		font-weight: 300;
		font-family: var(--font-secondary);
	}

	.features {
		height: 16rem;
		padding: 24px 32px;
		background: var(--background-header);
		margin-bottom: 16rem;
	}
	.features h1 {
		margin: 0 0 14px;
		font-size: 2.5em;
		font-weight: 800;
	}
</style>