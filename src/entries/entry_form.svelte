<script type="ts">
	import { createEntry, updateEntry, type Entry } from './../model/entries';
	import Dialog from '../components/dialog.svelte';
	import { entries } from './../stores/entries';
	import { createEventDispatcher } from 'svelte';
	import Stack from '../components/stack.svelte';
	import Textfield from '../components/form/textfield.svelte';
	import Numberfield from '../components/form/numberfield.svelte';
	import FormSubmit from '../components/form/form-submit.svelte';

	export let id: number | null = null;
	export let title = 'Add new entry';
	export let open = false;

	const dispatch = createEventDispatcher();

	export let amount = 0;
	export let description = '';

	const onSubmit = async function (): Promise<void> {
		try {
			if (!id) {
				const result = await createEntry({ amount, description });
				$entries = [...$entries, result];
			} else {
				const entryIndex = $entries.findIndex((item) => item.id === id);
				const result = await updateEntry({ ...$entries[entryIndex], amount, description });
				$entries[entryIndex] = result;
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
			<Numberfield label="Amount: " bind:value={amount} />
			<Textfield label="Description: " bind:value={description} />
			<FormSubmit on:cancel={() => dispatch('close')} />
		</Stack>
	</form>
</Dialog>
