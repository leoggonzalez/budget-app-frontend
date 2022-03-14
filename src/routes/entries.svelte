<script type="ts">
	import Button from '../components/button.svelte';
	import Icon from '../components/icon.svelte';
	import Page from '../components/page.svelte';
	import Stack from '../components/stack.svelte';
	import EntryForm from '../entries/entry_form.svelte';
	import EntriesList from '../entries/entries_list.svelte';
	import { countBy } from 'lodash';
	import { entries } from '../stores/entries';
	import { accounts } from '../stores/accounts';
	import CreateEntry from '../entries/create_entry.svelte';

	$: accountsToDisplay = Object.keys(countBy($entries, 'accountId')).map((key) =>
		$accounts.find((item) => item.id === key)
	);
</script>

<svelte:head>
	<title>Entries</title>
</svelte:head>

<Page title="Entries">
	<Stack>
		<header>
			<CreateEntry />
		</header>
		<EntriesList accounts={accountsToDisplay} />
	</Stack>
</Page>
