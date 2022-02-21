<script>
	import Page from '../components/page.svelte';
	import Nav from '../components/nav.svelte';
</script>

<div class="app">
	<Nav />
	<slot />
</div>

<style>
	.app {
		background-color: var(--color-background-primary);
		min-height: 100vh;
	}
</style>
