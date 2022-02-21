<script>
  export let open = false;
  export let title = 'Dialog';

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  const close = function() {
    dispatch('close');
  }
  const confirm = function() {
    dispatch('confirm');
  }
</script>

<dialog {open}>
  <header class="dialog-header">
    {title}
    <button on:click={close}>close</button>
  </header>
  <div class="dialog-body">
    <slot></slot>
  </div>
  <footer class="dialog-footer">
    <button on:click={close}>cancel</button>
    <button on:click={confirm}>confirm</button>
  </footer>
</dialog>