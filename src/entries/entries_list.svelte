<script type="ts">
	import { deleteEntry } from '../model/entries';
	import { entries } from '../stores/entries';
	import Stack from '../components/stack.svelte';
	import Entry from './entry.svelte';
	import EntryForm from './entry_form.svelte';
	import Button from '../components/button.svelte';
	import Confirmation from '../components/confirmation.svelte';

	let displayEditDialog = false;
	const handleEdit = (id: number) => {
		displayEditDialog = true;
		selectedEntryId = id;
	};

	let displayDeleteDialog = false;
	let loadingDelete: number | null = null;
	const handleDelete = async function (): Promise<void> {
		displayDeleteDialog = true;
		try {
			loadingDelete = selectedEntry.id;
			await deleteEntry(selectedEntry.id);
			$entries = [...$entries.filter((entry) => entry.id !== selectedEntry.id)];
		} catch (error) {
			console.log(error);
		} finally {
			loadingDelete = null;
			displayDeleteDialog = false;
		}
	};

	let selectedEntryId: number | null = null;
	$: selectedEntry = $entries.find((entry) => entry.id === selectedEntryId);
</script>

{#if !$entries.length}
	<p>No entries yet</p>
{:else}
	<ul class="list">
		<Stack size="sm">
			{#each $entries as entry (entry.id)}
				<li class="list-item">
					<Entry
						{entry}
						on:edit={() => {
							displayEditDialog = true;
							selectedEntryId = entry.id;
						}}
						on:delete={() => {
							displayDeleteDialog = true;
							selectedEntryId = entry.id;
						}}
					/>
				</li>
			{/each}
		</Stack>
	</ul>
	{#if displayEditDialog}
		<EntryForm
			title="Edit entry"
			open={displayEditDialog}
			on:close={() => {
				selectedEntryId = null;
				displayEditDialog = false;
			}}
			{...selectedEntry}
		/>
	{/if}
	{#if displayDeleteDialog}
		<Confirmation
			on:cancel={() => {
				selectedEntryId = null;
				displayDeleteDialog = false;
			}}
			on:submit={handleDelete}
		/>
	{/if}
{/if}
