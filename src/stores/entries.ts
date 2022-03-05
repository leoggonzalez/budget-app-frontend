import { readEntries, type Entry } from './../model/entries';
import { writable } from 'svelte/store';

export const entries = writable<Entry[]>([]);

const fetchEntries = async (): Promise<void> => {
	const data = await readEntries();

	entries.set(data);
};
fetchEntries();
