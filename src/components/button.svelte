<script>
</script>

<button class="button" on:click>
	<slot />
</button>

<style>
	.button {
		text-transform: uppercase;
		border: none;
		background-color: var(--color-primary);
		color: white;
		padding: var(--size-sm) var(--size-md);
		border-radius: 4px;
		font-family: var(--font-primary);
		font-weight: bold;
		line-height: 1;
		cursor: pointer;
	}
	.button:hover {
		background-color: var(--color-secondary);
	}
</style>
