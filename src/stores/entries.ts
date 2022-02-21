import type { Entry } from './../model/entries';
import { writable } from 'svelte/store';

export const entries = writable<Entry[]>([]);

const fetchEntries = async (): Promise<void> => {
	const url = 'http://localhost:3000/entries';
	const resp = await fetch(url);
	const data = await resp.json();

	entries.set(
		data.map((item) => ({
			id: item.id,
			amount: item.amount,
			description: item.description,
			createdAt: new Date(item.created_at),
			updatedAt: new Date(item.updated_at)
		}))
	);
};
fetchEntries();
