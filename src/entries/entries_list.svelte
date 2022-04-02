<script type="ts">
	import { deleteEntry, filterByAccount, getTotal } from '../model/entries';
	import { entries } from '../stores/entries';
	import Stack from '../components/stack.svelte';
	import Entry from './entry.svelte';
	import EntryForm from './entry_form.svelte';
	import Confirmation from '../components/confirmation.svelte';
	import Card from '../components/card.svelte';
	import Value from '../components/value.svelte';
	import type { Account } from '../model/accounts';
	import Button from '../components/button.svelte';

	let displayEditDialog = false;

	let displayDeleteDialog = false;
	const handleDelete = async function (): Promise<void> {
		displayDeleteDialog = true;
		try {
			await deleteEntry(selectedEntry.id);
			$entries = [...$entries.filter((entry) => entry.id !== selectedEntry.id)];
		} catch (error) {
			console.log(error);
		} finally {
			displayDeleteDialog = false;
		}
	};

	let selectedEntryId: number | null = null;
	$: selectedEntry = $entries.find((entry) => entry.id === selectedEntryId);

	export let accounts: Account[] = [];
	$: accountsWithFilter = accounts.map((item) => {
		return {
			...item,
			filter: filterByAccount(item),
			limit: 5
		};
	});
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
		<ul class="account-entries">
			<Stack size="lg">
				{#each accountsWithFilter as account}
					<li class="account-entry">
						<h2 class="account-name">{account?.name}</h2>
						<ul class="list">
							<Stack size="sm">
								{#each account.filter($entries, 5) as entry (entry.id)}
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
								{#if account.filter($entries).length > 5}
									<li><Button href={`/accounts/${account.id}`}>See more</Button></li>
								{/if}
							</Stack>
						</ul>
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
	.account-name {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 12px;
	}
</style>
