<script type="ts">
	import Stack from '../components/stack.svelte';
	import Confirmation from '../components/confirmation.svelte';
	import { accounts } from '../stores/accounts';
	import { deleteAccount } from '../model/accounts';
	import AccountForm from './account_form.svelte';

	let displayEditDialog = false;
	const handleEdit = (id: number) => {
		displayEditDialog = true;
		selectedAccountId = id;
	};

	let displayDeleteDialog = false;
	const handleDelete = async function (): Promise<void> {
		displayDeleteDialog = true;
		try {
			await deleteAccount(selectedAccountId);
			$accounts = [...$accounts.filter((account) => account.id !== selectedAccountId)];
		} catch (error) {
			console.log(error);
		} finally {
			displayDeleteDialog = false;
		}
	};

	let selectedAccountId: number | null = null;
	$: selectedAccount = $accounts.find((account) => account.id === selectedAccountId);
</script>

{#if !$accounts.length}
	<p>No accounts yet</p>
{:else}
	<ul class="list">
		<Stack size="sm">
			{#each $accounts as account (account.id)}
				<li class="list-item">
					{account.name}
				</li>
			{/each}
		</Stack>
	</ul>
	{#if displayEditDialog}
		<AccountForm
			title="Edit account"
			open={displayEditDialog}
			on:close={() => {
				selectedAccountId = null;
				displayEditDialog = false;
			}}
			{...selectedAccount}
		/>
	{/if}
	{#if displayDeleteDialog}
		<Confirmation
			on:cancel={() => {
				selectedAccountId = null;
				displayDeleteDialog = false;
			}}
			on:submit={handleDelete}
		/>
	{/if}
{/if}
