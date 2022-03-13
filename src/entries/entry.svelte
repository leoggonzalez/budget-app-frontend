<script type="ts">
	import Card from '../components/card.svelte';
	import Value from '../components/value.svelte';
	import type { Entry } from '../model/entries';

	export let entry: Entry;
</script>

<Card options={['edit', 'delete']} on:edit on:delete>
	<div class="entry">
		<div class="entry-amount">
			<h2>
				<Value value={entry.amount} />
			</h2>
		</div>
		<div class="entry-details">
			<header class="entry-details__header">
				<small class="entry-date">{entry.createdAt?.toLocaleDateString()}</small>
			</header>
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

	.entry-details__header {
		display: flex;
		gap: 4px;
		align-items: center;
		color: var(--color-background-secondary);
		margin-bottom: var(--size-xxs);
	}
</style>
