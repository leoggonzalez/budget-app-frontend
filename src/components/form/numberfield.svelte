<script type="ts">
	import Stack from '../stack.svelte';

	export let value: number = undefined;
	export let label: string = undefined;
	export let autofocus: boolean = undefined;
</script>

<div class="form-group">
	<Stack size="sm">
		{#if label}
			<label class="form-label" for="input">{label}</label>
		{/if}
		<!-- svelte-ignore a11y-autofocus -->
		<input class="form-input" id="input" type="number" bind:value step="any" {autofocus} />
	</Stack>
</div>

<style>
</style>
