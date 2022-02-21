<script type="ts">
	import Container from './container.svelte';

	export let title: string = '';
</script>

<div class="page">
	<Container>
		<h1 class="page-title">{title}</h1>
		<slot />
	</Container>
</div>

<style>
	.page {
		padding: var(--size-xxl) 0;
	}

	.page-title {
		border-bottom: 1px solid var(--color-primary);
		padding-bottom: var(--size-lg);
		margin-bottom: var(--size-xxl);
	}
</style>
