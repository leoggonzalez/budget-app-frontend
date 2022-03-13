<script type="ts">
	import { deleteEntry, getTotal } from '../model/entries';
	import { entries } from '../stores/entries';
	import Stack from '../components/stack.svelte';
	import Entry from './entry.svelte';
	import EntryForm from './entry_form.svelte';
	import Button from '../components/button.svelte';
	import Confirmation from '../components/confirmation.svelte';
	import Card from '../components/card.svelte';
	import { countBy, filter } from 'lodash';
	import Value from '../components/value.svelte';

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
	<Stack>
		<header>
			<Card>
				<small>Total</small>
				<h2>
					<Value value={getTotal($entries)} />
				</h2>
			</Card>
			<Card>
				<small>Income</small>
				<h3>
					<Value value={getTotal($entries.filter((item) => item.amount > 0))} />
				</h3>
			</Card>
			<Card>
				<small>Expenses</small>
				<h3>
					<Value value={getTotal($entries.filter((item) => item.amount < 0))} />
				</h3>
			</Card>
		</header>
		<div class="separator" />
		<ul class="list">
			<Stack size="sm">
				{#each $entries.reverse() as entry (entry.id)}
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
	</Stack>
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

<style>
	header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
</style>
