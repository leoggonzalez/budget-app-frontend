<script>
	import { createEventDispatcher } from 'svelte';

	import Button from '../button.svelte';

	const dispatch = createEventDispatcher();

	const cancel = function () {
		dispatch('cancel');
	};
	const submit = function () {
		dispatch('submit');
	};
</script>

<div class="form-submit">
	<Button on:click={cancel}>Cancel</Button>
	<Button submit on:click={submit}>Submit</Button>
</div>

<style>
	.form-submit {
		display: flex;
		justify-content: flex-end;
		gap: var(--size-sm);
	}
</style>
