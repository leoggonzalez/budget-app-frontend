<script type="ts">
	import Button from '../components/button.svelte';
	import Icon from '../components/icon.svelte';
	import EntryForm from './entry_form.svelte';

	let displayModal: boolean;
	export let accountId = '';
</script>

<div class="create-entry">
	<Button on:click={() => (displayModal = true)}>
		<Icon font name="fa-solid fa-add" />
		Add Entry
	</Button>
	{#if displayModal}
		<EntryForm open={displayModal} on:close={() => (displayModal = false)} {accountId} />
	{/if}
</div>
