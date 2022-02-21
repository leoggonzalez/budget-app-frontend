<script>
	import Container from './container.svelte';
</script>

<div class="page">
	<Container>
		<slot />
	</Container>
</div>

<style>
	.page {
		padding: var(--size-xxl) 0;
	}
</style>
