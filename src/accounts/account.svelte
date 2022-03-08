<script type="ts">
	import Card from '../components/card.svelte';
	import Stack from '../components/stack.svelte';
	import type { Account } from '../model/accounts';

	export let account: Account;
</script>

<Card vertical options={['edit', 'delete']} on:edit on:delete>
	<div class="account">
		<header class="account-name">
			<h3>{account.name}</h3>
		</header>
		<Stack size="sm">
			<small class="account-date">Created on: {account.createdAt?.toLocaleDateString()}</small>
			<div
				class="account-total"
				class:positive={account.total > 0}
				class:negative={account.total < 0}
			>
				{#if account.total > 0}
					<p>+</p>
				{:else if account.total < 0}
					<p>-</p>
				{/if}
				<p>
					Total: {account.total}
				</p>
			</div>
		</Stack>
	</div>
</Card>

<style>
	.account-date {
		color: var(--color-background-secondary);
	}
</style>
