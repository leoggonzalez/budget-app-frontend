<script type="ts">
	import { createEventDispatcher } from 'svelte';

	import Dialog from './dialog.svelte';
	import FormSubmit from './form/form-submit.svelte';

	let open = false;
</script>

<Dialog {open} on:close>
	Do you really want to delete this item?
	<FormSubmit on:cancel on:submit />
</Dialog>
