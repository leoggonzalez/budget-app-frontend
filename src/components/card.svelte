<script type="ts">
	import Stack from './stack.svelte';

	export let options: Array<'edit' | 'delete'> = [];

	const optionIcons = {
		edit: 'fa-solid fa-pencil',
		delete: 'fa-solid fa-trash-can'
	};

	let displayOptions = false;

	let optionsNode: HTMLDivElement;

	function handleDisplayOptions() {
		displayOptions = true;
		optionsNode.focus();
	}
</script>

<div class="card">
	<div class="card-body">
		<slot />
	</div>
	{#if options.length}
		<div class="card-display-options {!displayOptions && 'active'}" on:click={handleDisplayOptions}>
			<div class="icon">
				<i class="fa-solid fa-ellipsis-vertical" />
			</div>
		</div>
		<div
			class="card-options {displayOptions && 'active'}"
			on:blur={() => (displayOptions = false)}
			tabindex="0"
			bind:this={optionsNode}
		>
			<ul class="options">
				<Stack line>
					{#each options as option}
						<li class="option">
							<i class={optionIcons[option]} />
						</li>
					{/each}
				</Stack>
			</ul>
		</div>
	{/if}
</div>

<style>
	.card {
		background-color: white;
		border-radius: var(--radius-sm);
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: 'body options';
		overflow: hidden;
	}
	.card-body {
		padding: var(--size-sm);
		width: 100%;
		grid-area: body;
	}

	.card-display-options,
	.card-options {
		padding: var(--size-sm);
		display: flex;
		align-items: center;
		grid-area: options;
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}

	.card-display-options.active,
	.card-options.active {
		position: relative;
		opacity: unset;
		pointer-events: unset;
	}

	.card-options {
		background-color: var(--color-primary);
		color: var(--color-accent);
		transform: translateX(100%);
		transition: 0.3s linear;
	}
	.card-options.active {
		transform: translateX(0);
	}
</style>
