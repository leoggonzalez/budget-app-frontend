import { camelCase } from 'lodash';

export function camelcaseKeys<T>(object: Record<string, T>): Record<string, T> {
	let result: Record<string, T>;

	Object.keys(object).forEach((key) => {
		result[camelCase[key]] = object[key];
	});

	return result;
}
