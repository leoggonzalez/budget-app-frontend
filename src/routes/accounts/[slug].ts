import { parseAccount, readAccount, type AccountFromApi } from '../../model/accounts';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	const account = await readAccount(params.slug);

	if (account) {
		return {
			body: { account: parseAccount(account as AccountFromApi) }
		};
	}

	return {
		status: 404
	};
}
