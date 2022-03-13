<script type="ts">
	export let value: string | number = '';

	$: parsedValue = Number(value);
</script>

<span class:positive={parsedValue > 0} class:negative={parsedValue < 0}>
	{new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(
		Math.abs(parsedValue)
	)}
</span>

<style>
	span.positive {
		color: var(--color-success);
	}
	span.negative {
		color: var(--color-error);
	}
</style>
