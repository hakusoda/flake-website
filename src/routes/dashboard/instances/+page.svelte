<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="instances">
	<h2>Your Instances (click to view)</h2>
	{#each data.instances as item}
		<a class="instance" href={`/dashboard/instances/${item.id}`}>
			<h3>Instance {item.id}</h3>
		</a>
	{/each}
	<form class="create" method="POST">
		{#if form}
			<p class="error">{form.error}</p>
		{/if}
		<button>create new</button>
	</form>
</div>

<style lang="scss">
	.instances {
		margin: 3rem 4rem;

		form.create {
			margin-top: 4rem;

			.error {
				border: 1px solid #ff8787;
				padding: 12px 16px;
				background: #ff4545;
				border-radius: 8px;
			}
		}
	}
	.instance {
		color: var(--color-primary);
		display: block;
		padding: 16px 20px;
		background: var(--background-primary);
		border-radius: 8px;
		margin-bottom: 16px;
		text-decoration: none;

		h3 {
			margin: 0;
			font-weight: 600;
		}
		p {
			margin: 8px 0 0 0;
			font-size: 14px;
		}
		.key {
			margin-top: 4px;
		}
	}
</style>