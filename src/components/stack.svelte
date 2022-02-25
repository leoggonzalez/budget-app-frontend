<script type="ts">
	import type { Size } from '../model/util';

	export let line = false;
	export let size: Size = 'md';
</script>

<div class={`stack stack--${size}`} class:line>
	<slot />
</div>

<style>
	.stack {
		display: grid;
		gap: var(--size-md);
	}
	.stack.line {
		grid-auto-flow: column;
	}
	.stack--sm {
		gap: var(--size-sm);
	}
	.stack--lg {
		gap: var(--size-lg);
	}
</style>
