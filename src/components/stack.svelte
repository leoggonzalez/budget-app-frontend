<script>
	export let line = false;
</script>

<div class="stack" class:line>
	<slot />
</div>

<style>
	.stack {
		display: grid;
		gap: var(--size-md);
	}
	.stack.line {
		grid-auto-flow: column;
	}
</style>
