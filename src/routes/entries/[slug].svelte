<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `http://localhost:3000/entries/${page.params.slug}.json`;
		const res = await fetch(url);

		console.log(res);

		if (res.ok) {
			return {
				props: {
					entry: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script type="ts">
	import type { Entry } from '../../model/entries';

	export let entry: Entry;
</script>

<svelte:head>
	<title>Entry n° {entry.id}</title>
</svelte:head>

<h1>Entry n° {entry.id}</h1>
<p><strong>Amount:</strong> {entry.amount}</p>
<p><strong>Description:</strong> {entry.description}</p>
