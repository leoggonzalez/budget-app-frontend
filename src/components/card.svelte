<script type="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';
	import Stack from './stack.svelte';

	export let vertical = false;
	export let options: Array<'edit' | 'delete'> = [];

	const optionIcons = {
		edit: 'fa-solid fa-pencil',
		delete: 'fa-solid fa-trash-can'
	};

	let displayOptions: boolean;

	let optionsNode: HTMLDivElement;
	function handleDisplayOptions() {
		displayOptions = true;
		setTimeout(() => {
			optionsNode.focus();
		}, 300);
	}

	const dispatch = createEventDispatcher();
</script>

<div class="card" class:vertical>
	<div class="card-body">
		<slot />
	</div>
	<div class={`options-trigger ${displayOptions ? 'active' : ''}`} on:click={handleDisplayOptions}>
		<Icon name={`fa-solid ${vertical ? 'fa-ellipsis' : 'fa-ellipsis-vertical'}`} />
	</div>
	<div
		class={`options ${displayOptions ? 'active' : ''}`}
		on:blur={() => (displayOptions = false)}
		tabindex="0"
		bind:this={optionsNode}
	>
		<ul class="option-items">
			<Stack line>
				{#each options as option}
					<li class="option-item" on:click={() => dispatch(option)}>
						<Icon name={optionIcons[option]} font />
					</li>
				{/each}
			</Stack>
		</ul>
	</div>
</div>

<style>
	.card {
		background-color: white;
		padding: var(--size-sm);
		position: relative;
		overflow: hidden;
		border-radius: 6px;
	}
	.options-trigger,
	.options {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		padding: var(--size-sm);
		display: flex;
		align-items: center;
	}

	.options-trigger.active {
		opacity: 0;
	}

	.options {
		background-color: aliceblue;
		opacity: 0;
		pointer-events: none;
		transform: translateX(100%);
		transition: 0.3s;
		background-color: var(--color-primary);
		color: var(--color-accent);
	}
	.options.active {
		opacity: 1;
		pointer-events: all;
		transform: translateX(0);
	}

	/*CARD VERTICAL*/
	.card.vertical {
		padding-top: 48px;
	}

	.card.vertical .options-trigger {
		height: auto;
	}

	.card.vertical .options {
		transform: translateY(-100%);
		height: auto;
		width: 100%;
		justify-content: flex-end;
	}
	.card.vertical .options.active {
		transform: translateY(0);
	}
</style>
