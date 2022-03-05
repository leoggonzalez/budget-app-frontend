<script type="ts">
	import Dialog from '../components/dialog.svelte';
	import { accounts } from './../stores/accounts';
	import { createEventDispatcher } from 'svelte';
	import Stack from '../components/stack.svelte';
	import Textfield from '../components/form/textfield.svelte';
	import FormSubmit from '../components/form/form-submit.svelte';
	import { createAccount, updateAccount } from '../model/accounts';

	export let id: number | null = null;
	export let title = 'Add new Account';
	export let open = false;

	const dispatch = createEventDispatcher();

	export let name = '';

	const onSubmit = async function (): Promise<void> {
		try {
			if (!id) {
				const result = await createAccount({ name });
				$accounts = [...$accounts, result];
			} else {
				const accountIndex = $accounts.findIndex((item) => item.id === id);
				const result = await updateAccount({ ...$accounts[accountIndex], name });
				$accounts[accountIndex] = result;
			}
			dispatch('close');
		} catch (error) {
			console.log(error);
		}
	};
</script>

<Dialog {open} on:close on:confirm={onSubmit} {title} size="mobile">
	<form on:submit={onSubmit} action="#">
		<Stack>
			<Textfield label="Name: " bind:value={name} />
			<FormSubmit on:cancel={() => dispatch('close')} />
		</Stack>
	</form>
</Dialog>
