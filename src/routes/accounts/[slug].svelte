<script type="ts">
	import Page from '../../components/page.svelte';
	import Stack from '../../components/stack.svelte';
	import CreateEntry from '../../entries/create_entry.svelte';
	import EntriesList from '../../entries/entries_list.svelte';
	import type { Account } from '../../model/accounts';

	export let account: Account;
</script>

<Page title={account.name}>
	<Stack>
		<header>
			<CreateEntry accountId={account.id} />
		</header>
		<EntriesList accounts={[account]} />
	</Stack>
</Page>
