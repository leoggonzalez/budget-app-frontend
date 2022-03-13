<script type="ts">
	import Stack from '../stack.svelte';

	interface Option {
		value: string;
		label?: string;
	}

	export let value: string = undefined;
	export let label: string = undefined;
	export let options: Option[] = [];

	console.log(value);
</script>

<div class="form-group">
	<Stack size="sm">
		{#if label}
			<label class="form-label" for="select">{label}</label>
		{/if}
		<select class="form-input" id="select" type="text" bind:value>
			{#each options as option}
				<option value={option.value} selected={option.value === value}
					>{option.label || option.value}</option
				>
			{/each}
		</select>
	</Stack>
</div>
