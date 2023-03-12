<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<h1>{$page.status}</h1>
	<p>{$page.error.message}</p>

	<img src="/img/dog.gif" alt="hourglass dog" width="128">
</div>

<style lang="scss">
	.container {
		margin: 4rem;
		img {
			margin-top: 2rem;
		}
	}
</style>