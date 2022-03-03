<script type="ts">
	import Button from '../components/button.svelte';
	import Icon from '../components/icon.svelte';
	import Page from '../components/page.svelte';
	import Stack from '../components/stack.svelte';
	import EntryForm from '../entries/entry_form.svelte';
	import EntriesList from '../entries/entries_list.svelte';

	let displayModal: boolean;
</script>

<svelte:head>
	<title>Entries</title>
</svelte:head>

<Page title="Entries">
	<Stack>
		<header>
			<Button on:click={() => (displayModal = true)}>
				<Icon font name="fa-solid fa-add" />
				Add Entry
			</Button>
		</header>
		<EntriesList />
	</Stack>
	{#if displayModal}
		<EntryForm open={displayModal} on:close={() => (displayModal = false)} />
	{/if}
</Page>
