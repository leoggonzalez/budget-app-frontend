<script type="ts">
	import Button from '../components/button.svelte';
	import Icon from '../components/icon.svelte';
	import Page from '../components/page.svelte';
	import Stack from '../components/stack.svelte';
	import AccountForm from '../accounts/account_form.svelte';
	import AccountsList from '../accounts/accounts_list.svelte';

	let displayModal: boolean;
</script>

<svelte:head>
	<title>Accounts</title>
</svelte:head>

<Page title="Accounts">
	<Stack>
		<header>
			<Button on:click={() => (displayModal = true)}>
				<Icon font name="fa-solid fa-add" />
				Add Account
			</Button>
		</header>
		<AccountsList />
	</Stack>
	{#if displayModal}
		<AccountForm open={displayModal} on:close={() => (displayModal = false)} />
	{/if}
</Page>
