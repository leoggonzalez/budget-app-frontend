<script>
	import Nav from '../components/nav.svelte';
	import '../styles/global.css';
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
