<script type="ts">
	import { deleteEntry } from '../model/entries';
	import { entries } from '../stores/entries';
	import Stack from '../components/stack.svelte';
	import Entry from './entry.svelte';
	import EntryForm from './entry_form.svelte';
	import Button from '../components/button.svelte';

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

	let selectedEntryId: number | null = null;
	$: selectedEntry = $entries.find((entry) => entry.id === selectedEntryId);
	$: displayModal = !!selectedEntry;
</script>

{#if !$entries.length}
	<p>No entries yet</p>
{:else}
	<ul class="list">
		<Stack>
			{#each $entries as entry (entry.id)}
				<li class="list-item">
					<Entry {entry} on:edit={() => (selectedEntryId = entry.id)} />
				</li>
			{/each}
		</Stack>
	</ul>
	{#if displayModal}
		<EntryForm
			title="Edit entry"
			open={displayModal}
			on:close={() => (selectedEntryId = null)}
			{...selectedEntry}
		/>
	{/if}
{/if}
