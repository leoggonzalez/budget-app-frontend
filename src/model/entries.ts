export interface Entry {
	id: number;
	amount: number;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

export async function getEntry(id: number): Promise<Entry> {
	const res = await fetch(`http://localhost:3000/entries/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const entry = await res.json();

	console.log(entry);

	return entry;
}

export async function createEntry(entry: Partial<Entry>): Promise<Entry> {
	const res = await fetch('http://localhost:3000/entries', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(entry)
	});
	const newEntry = await res.json();

	return newEntry;
}

export async function deleteEntry(id: number): Promise<void> {
	await fetch(`http://localhost:3000/entries/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
