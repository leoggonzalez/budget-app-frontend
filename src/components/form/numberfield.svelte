<script type="ts">
	import Stack from '../stack.svelte';

	export let value: number = undefined;
	export let label: string = undefined;
</script>

<div class="form-group">
	<Stack size="sm">
		{#if label}
			<label class="form-label" for="input">{label}</label>
		{/if}
		<input class="form-input" id="input" type="number" {value} on:change />
	</Stack>
</div>

<style>
</style>
