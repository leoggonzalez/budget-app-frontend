<script type="ts">
	import { deleteEntry } from '../model/entries';
	import { entries } from '../stores/entries';
	import { goto } from '$app/navigation';
	import Card from '../components/card.svelte';
	import Stack from '../components/stack.svelte';

	let loadingDelete: number | null = null;
	const handleDelete = async function (id: number): Promise<void> {
		try {
			loadingDelete = id;
			await deleteEntry(id);
			$entries = [...$entries.filter((entry) => entry.id !== id)];
		} catch (error) {
			console.log(error);
		} finally {
			loadingDelete = null;
		}
	};
</script>

{#if !$entries.length}
	<p>No entries yet</p>
{:else}
	<ul class="list">
		<Stack>
			{#each $entries as entry (entry.id)}
				<li class="list-item">
					<Card options={['edit', 'delete']}>
						<header class="list-item__header">
							<p>Entry n°: {entry.id}</p>
							<button on:click={() => goto(`/entries/${entry.id}`, { replaceState: true })}
								>edit</button
							>
							<button on:click={() => handleDelete(entry.id)}
								>{loadingDelete === entry.id ? 'loading' : 'delete'}</button
							>
						</header>
						<div class="list-item__body">
							<p><strong>Amount:</strong> {entry.amount}</p>
							<p><strong>Description:</strong> {entry.description}</p>
						</div>
					</Card>
				</li>
			{/each}
		</Stack>
	</ul>
{/if}
