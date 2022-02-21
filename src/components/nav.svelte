<nav class="navbar">
	<h3 class="navbar-title">
		<a href="/">Budget App</a>
	</h3>
	<ul class="navbar-links">
		<li class="navbar-link" />
		<li class="navbar-link">
			<a href="/entries">Entries</a>
		</li>
		<li class="navbar-link">
			<a href="/accounts">Accounts</a>
		</li>
	</ul>
</nav>

<style>
	.navbar {
		background-color: var(--color-background-secondary);
		padding: var(--size-sm);
		font-family: var(--font-secondary);
		display: flex;
		align-items: center;
	}

	.navbar-links {
		display: flex;
		gap: var(--size-md);
		margin-left: auto;
		text-transform: uppercase;
		font-weight: 600;
	}

	a {
		text-decoration: none;
	}
</style>
