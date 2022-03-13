import { writable } from 'svelte/store';

export interface Settings {
	entryFormSelectedAccountId?: string;
}

export const settings = writable<Settings>({});
