<script type="ts">
	import { deleteEntry } from '../model/entries';
	import { entries } from '../stores/entries';
	import { goto } from '$app/navigation';

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
		{#each $entries as entry (entry.id)}
			<li class="list-item">
				<header class="list-item__header">
					<p>Entry n°: {entry.id}</p>
					<button on:click={() => goto(`/entries/${entry.id}`, { replaceState: true })}>edit</button
					>
					<button on:click={() => handleDelete(entry.id)}
						>{loadingDelete === entry.id ? 'loading' : 'delete'}</button
					>
				</header>
				<div class="list-item__body">
					<p><strong>Amount:</strong> {entry.amount}</p>
					<p><strong>Description:</strong> {entry.description}</p>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 16px;
	}
	.list-item {
		border: 1px solid black;
	}
	.list-item__header {
		display: flex;
		justify-content: space-between;
	}
</style>
