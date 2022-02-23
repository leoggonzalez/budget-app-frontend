<script type="ts">
	import { deleteEntry } from '../model/entries';
	import { entries } from '../stores/entries';
	import Stack from '../components/stack.svelte';
	import Entry from './entry.svelte';

	let loadingDelete: number | null = null;
	const handleDelete = async function (id: number): Promise<void> {
		try {
			loadingDelete = id;
			await deleteEntry(id);
			$entries = [...$entries.filter((entry) => entry.id !== id)];
		} catch (error) {
			console.log(error);
		} finally {
			loadingDelete = null;
		}
	};
</script>

{#if !$entries.length}
	<p>No entries yet</p>
{:else}
	<ul class="list">
		<Stack>
			{#each $entries as entry (entry.id)}
				<li class="list-item">
					<Entry {entry} />
				</li>
			{/each}
		</Stack>
	</ul>
{/if}
