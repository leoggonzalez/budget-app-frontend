<script>
	export let open = false;
	export let title = 'Dialog';

	import { createEventDispatcher } from 'svelte';
	import Stack from './stack.svelte';

	const dispatch = createEventDispatcher();

	const close = function () {
		dispatch('close');
	};
	const confirm = function () {
		dispatch('confirm');
	};
</script>

<dialog {open}>
	<div class="dialog-background" on:click={close} />
	<div class="dialog-container">
		<Stack size="lg">
			<header class="dialog-header">
				<h4>{title}</h4>
				<div class="icon clickable" on:click={close}>
					<i class="fa-solid fa-xmark" />
				</div>
			</header>
			<div class="dialog-body">
				<slot />
			</div>
			<footer class="dialog-footer">
				<button on:click={close}>cancel</button>
				<button on:click={confirm}>confirm</button>
			</footer>
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
		display: flex;
		align-items: center;
		justify-content: center;
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
	}

	.dialog-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
