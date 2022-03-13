export interface EntryBase {
	id: number;
	amount: number;
	description?: string;
}
export interface EntryFromApi extends EntryBase {
	created_at: string;
	updated_at: string;
	account_id: number;
}
export interface Entry extends EntryBase {
	createdAt: Date;
	updatedAt: Date;
	accountId: string;
}

export async function createEntry(entry: Partial<Entry>): Promise<Entry> {
	const res = await fetch('http://localhost:3000/entries', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(parseEntryParams(entry))
	});
	if (!res.ok) {
		throw new Error("Can't create new entry");
	}

	const newEntry = await res.json();

	return parseEntry(newEntry);
}

// READ
export async function readEntries(): Promise<Entry[]> {
	const url = 'http://localhost:3000/entries';
	const resp = await fetch(url);
	const data: EntryFromApi[] = await resp.json();

	return data.map((entries) => parseEntry(entries));
}

export async function readEntry(id: number): Promise<Entry> {
	const res = await fetch(`http://localhost:3000/entries/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const entry = await res.json();

	return entry;
}

export async function updateEntry(entry: Entry): Promise<Entry> {
	const res = await fetch(`http://localhost:3000/entries/${entry.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(parseEntryParams(entry))
	});
	const newEntry: EntryFromApi = await res.json();

	return parseEntry(newEntry);
}

export async function deleteEntry(id: number): Promise<void> {
	await fetch(`http://localhost:3000/entries/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// helpers
export function parseEntry(entry: EntryFromApi): Entry {
	return {
		id: entry.id,
		amount: entry.amount,
		description: entry.description,
		createdAt: new Date(entry.created_at),
		updatedAt: new Date(entry.updated_at),
		accountId: entry.account_id.toString()
	};
}

export function parseEntryParams(entry: Partial<Entry>): Partial<EntryFromApi> {
	return {
		id: entry.id,
		amount: entry.amount,
		description: entry.description,
		account_id: Number(entry.accountId)
	};
}
