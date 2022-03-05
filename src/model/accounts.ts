export interface AccountBase {
	id: number;
	name: string;
}
export interface AccountFromApi extends AccountBase {
	created_at: Date;
	updated_at: Date;
}
export interface Account extends AccountBase {
	createdAt: Date;
	updatedAt: Date;
}

export async function createAccount(account: Partial<Account>): Promise<Account> {
	const res = await fetch('http://localhost:3000/accounts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(account)
	});
	return await res.json();
}

// READ
export async function readAccounts(): Promise<Account[]> {
	try {
		const url = 'http://localhost:3000/accounts';
		const resp = await fetch(url);
		const data: AccountFromApi[] = await resp.json();

		return data.map((accounts) => parseAccount(accounts));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function readAccount(id: number): Promise<Account> {
	const res = await fetch(`http://localhost:3000/accounts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await res.json();
}

export async function updateAccount(account: Account): Promise<Account> {
	const res = await fetch(`http://localhost:3000/accounts/${account.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(account)
	});

	return parseAccount(await res.json());
}

export async function deleteAccount(id: number): Promise<void> {
	await fetch(`http://localhost:3000/accounts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// helpers
export function parseAccount(entry: AccountFromApi): Account {
	return {
		id: entry.id,
		name: entry.name,
		createdAt: new Date(entry.created_at),
		updatedAt: new Date(entry.updated_at)
	};
}
