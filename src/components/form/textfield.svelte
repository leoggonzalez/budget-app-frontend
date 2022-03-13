<script type="ts">
	import Stack from '../stack.svelte';

	export let value: string = undefined;
	export let label: string = undefined;
	export let autofocus: boolean = undefined;
</script>

<div class="form-group">
	<Stack size="sm">
		{#if label}
			<label class="form-label" for="input">{label}</label>
		{/if}
		<!-- svelte-ignore a11y-autofocus -->
		<input class="form-input" id="input" type="text" bind:value {autofocus} />
	</Stack>
</div>

<style>
	:global(.form-label) {
		display: block;
		font-weight: bold;
	}
	:global(.form-input) {
		font-size: var(--size-font);
		padding: var(--size-xs);
		border: 1px solid var(--color-background-secondary);
		border-radius: 4px;
	}
</style>
