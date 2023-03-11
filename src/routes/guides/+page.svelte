<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="posts">
	{#each data.items as post}
		<a class="post" href={post.url}>
			{post.title}
			<p class="date">
				{new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' })}
			</p>
			{#each post.tags as tag}
				<p class="tag">{tag}</p>
			{/each}
			<p class="summary">{post.summary}</p>
		</a>
	{/each}
</div>
this page is incomplete

<style>
	.posts {
		margin: 32px;
	}
	.post {
		color: var(--color-primary);
		margin: 24px 0;
		display: flex;
		padding: 12px 20px 16px;
		flex-wrap: wrap;
		font-size: 1.4em;
		background: var(--background-primary);
		font-weight: 600;
		border-radius: 16px;
		text-decoration: none;
	}
	.post .date {
		margin: 10px 16px 0;
		font-size: .6em;
		font-weight: 400;
	}
	.post .tag {
		margin: 4px 0 0;
		height: fit-content;
		border: 1px solid #ffffff40;
		padding: 4px 6px;
		font-size: .5em;
		font-weight: 400;
		border-radius: 4px;
		text-transform: uppercase;
	}
	.post .summary {
		width: 100%;
		margin: 6px 0 0 0;
		font-size: 14px;
		font-weight: 400;
	}
</style>