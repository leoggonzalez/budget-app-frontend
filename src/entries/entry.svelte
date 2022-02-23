<script type="ts">
	import Card from '../components/card.svelte';
	import type { Entry } from '../model/entries';

	export let entry: Entry;
</script>

<Card options={['edit', 'delete']}>
	<div class="entry">
		<div class="entry-amount" class:positive={entry.amount > 0} class:negative={entry.amount < 0}>
			{#if entry.amount > 0}
				<h3>+</h3>
			{:else if entry.amount < 0}
				<h3>-</h3>
			{/if}
			<h2>
				{entry.amount}
			</h2>
		</div>
		<div class="entry-details">
			<small class="entry-id">{entry.id}</small>
			<p>{entry.description}</p>
		</div>
	</div>
</Card>

<style>
	.entry {
		display: flex;
		align-items: flex-start;
		gap: var(--size-sm);
	}

	.entry-amount {
		display: flex;
		align-items: center;
	}

	.entry-amount.positive {
		color: var(--color-success);
	}

	.entry-id {
		display: block;
		margin-bottom: var(--size-xxs);
		color: var(--color-background-secondary);
	}
</style>
