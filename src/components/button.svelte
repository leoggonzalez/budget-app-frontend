<script>
	export let submit = false;
</script>

<button class="button" type={submit ? 'submit' : 'button'} on:click>
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
		display: flex;
		align-items: center;
		font-size: 16px;
		gap: 8px;
	}

	.button:hover {
		background-color: var(--color-secondary);
	}
</style>
