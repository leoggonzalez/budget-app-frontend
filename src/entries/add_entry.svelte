<script>
	import { createEntry } from './../model/entries';

	import Dialog from '../components/dialog.svelte';
	import { entries } from './../stores/entries';
	import { createEventDispatcher } from 'svelte';
	import Stack from '../components/stack.svelte';

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

<Dialog {open} on:close on:confirm={onSubmit} title="Add new entry">
	<form action="#">
		<Stack>
			<div class="form-group">
				<label for="amount" class="form-label">Amount: </label>
				<input id="amount" type="number" class="form-input" bind:value={amount} />
			</div>
			<div class="form-group">
				<label for="description" class="form-label">Description: </label>
				<input id="description" type="text" class="form-input" bind:value={description} />
			</div>
		</Stack>
	</form>
</Dialog>
