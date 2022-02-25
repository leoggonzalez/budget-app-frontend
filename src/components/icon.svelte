<script type="ts">
	import type { Size } from '../model/util';

	export let name: string;
	export let button = false;
	export let font = false;
</script>

<div class="icon" on:click class:button class:font>
	<i class={name} />
</div>

<style>
	.icon {
		height: 24px;
		width: 24px;
		font-size: 24px;
		line-height: 1;
		text-align: center;
		border-radius: 4px;
		cursor: pointer;
	}
	.icon.font {
		font-size: var(--size-font);
		height: var(--size-font);
		width: var(--size-font);
	}

	.icon.button:hover {
		background-color: var(--color-background-primary);
	}
</style>
