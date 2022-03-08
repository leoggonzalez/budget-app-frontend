<script type="ts">
	import Stack from '../components/stack.svelte';
	import Confirmation from '../components/confirmation.svelte';
	import { accounts } from '../stores/accounts';
	import { deleteAccount } from '../model/accounts';
	import AccountForm from './account_form.svelte';
	import Account from './account.svelte';

	let displayEditDialog = false;

	let displayDeleteDialog = false;
	const handleDelete = async function (): Promise<void> {
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
		{#each $accounts as account (account.id)}
			<li class="list-item">
				<Account
					{account}
					on:edit={() => {
						selectedAccountId = account.id;
						displayEditDialog = true;
					}}
					on:delete={() => {
						selectedAccountId = account.id;
						displayDeleteDialog = true;
					}}
				/>
			</li>
		{/each}
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

<style>
	.list {
		display: grid;
		gap: 32px;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
