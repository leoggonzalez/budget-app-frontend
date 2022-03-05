import { writable } from 'svelte/store';
import { readAccounts, type Account } from '../model/accounts';

export const accounts = writable<Account[]>([]);

const fetchAccount = async (): Promise<void> => {
	const data = await readAccounts();

	accounts.set(data);
};
fetchAccount();
