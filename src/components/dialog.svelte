<script type="ts">
	export let open = false;
	export let title = 'Dialog';
	export let size: 'tablet' | 'mobile' = undefined;

	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';
	import Stack from './stack.svelte';

	const dispatch = createEventDispatcher();

	const close = function (): void {
		dispatch('close');
	};
</script>

<dialog {open} class={size}>
	<div class="dialog-background" on:click={close} />
	<div class="dialog-container">
		<Stack size="lg">
			<header class="dialog-header">
				<h4>{title}</h4>
				<Icon on:click={close} name="fa-solid fa-xmark" button />
			</header>
			<div class="dialog-body">
				<slot />
			</div>
		</Stack>
	</div>
</dialog>

<style>
	dialog,
	.dialog-background {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	dialog {
		padding: 0;
		border: none;
		background-color: transparent;
		display: grid;
		grid-template-columns: minmax(var(--size-md), 1fr) minmax(auto, var(--page-size-desktop)) minmax(
				var(--size-md),
				1fr
			);
		grid-template-areas: 'gutter-left dialog gutter-right';
		align-items: center;
	}
	dialog.tablet {
		grid-template-columns: minmax(var(--size-md), 1fr) minmax(auto, var(--page-size-tablet)) minmax(
				var(--size-md),
				1fr
			);
	}

	dialog.mobile {
		grid-template-columns: minmax(var(--size-sm), 1fr) minmax(auto, var(--page-size-mobile)) minmax(
				var(--size-sm),
				1fr
			);
	}

	.dialog-background {
		background-color: var(--color-primary);
		opacity: 0.3;
	}
	.dialog-container {
		position: relative;
		background-color: white;
		padding: var(--size-md);
		border-radius: 8px;
		transform: translateY(-30%);
		display: flex;
		flex-direction: column;
		grid-area: dialog;
	}

	.dialog-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
