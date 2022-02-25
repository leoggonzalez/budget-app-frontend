<script>
	import { createEntry } from './../model/entries';
	import Dialog from '../components/dialog.svelte';
	import { entries } from './../stores/entries';
	import { createEventDispatcher } from 'svelte';
	import Stack from '../components/stack.svelte';
	import Textfield from '../components/form/textfield.svelte';
	import Numberfield from '../components/form/numberfield.svelte';
	import FormSubmit from '../components/form/form-submit.svelte';

	export let open = false;

	const dispatch = createEventDispatcher();

	let amount = 0;
	let description = '';

	const onSubmit = async function () {
		try {
			const entry = await createEntry({ amount, description });
			if (entry) {
				$entries = [...$entries, entry];
			}
			dispatch('close');
		} catch (error) {
			console.log(error);
		}
	};
</script>

<Dialog {open} on:close on:confirm={onSubmit} title="Add new entry" size="mobile">
	<form on:submit={() => console.log('submit')} action="#">
		<Stack>
			<Numberfield label="Amount: " bind:value={amount} />
			<Textfield label="Description: " bind:value={description} />
			<FormSubmit />
		</Stack>
	</form>
</Dialog>
