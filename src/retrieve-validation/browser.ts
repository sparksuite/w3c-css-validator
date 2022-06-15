// Imports
import { W3CCSSValidatorResponse } from '.';
import BadStatusError from './bad-status-error';
import retrieveValidation from '.';
import { W3CValidatorParameters } from '../types/parameters';

// Utility function for retrieving response from W3C CSS Validator in a browser environment
const retrieveInBrowser: typeof retrieveValidation = async (
	method: 'GET' | 'POST',
	parameters: W3CValidatorParameters | string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	// Build form data
	let formData: undefined | FormData = undefined;

	if (method === 'POST') {
		formData = new FormData();

		for (const [key, value] of Object.entries(parameters)) {
			formData.append(key, value);
		}

		formData.append('output', 'application/json');
		formData.append('profile', 'css3');
	}

	// Initialize controller who's signal will abort the fetch
	const controller = new AbortController();

	// Start timeout
	setTimeout(() => {
		controller.abort();
	}, timeout);

	// Attempt to fetch CSS validation, catching the abort error to handle specially
	let res: Response | null = null;

	try {
		res = await fetch(
			`https://jigsaw.w3.org/css-validator/validator${
				method === 'GET' && typeof parameters === 'string' ? `?${parameters}` : ''
			}`,
			{ method, body: formData, signal: controller.signal }
		);

		if (!res.ok) {
			throw new BadStatusError(res.statusText, res.status);
		}
	} catch (err: unknown) {
		if (err instanceof Error && err.name === 'AbortError') {
			throw new Error(`The request took longer than ${timeout}ms`);
		}

		if (err instanceof TypeError) {
			throw new TypeError(`${err.message} (This may be due to trying to validate too much CSS at once)`);
		}

		throw err;
	}

	if (!res) {
		throw new Error('Response expected');
	}

	// Parse JSON
	const data = (await res.json()) as W3CCSSValidatorResponse;

	// Return
	return data.cssvalidation;
};

export default retrieveInBrowser;
