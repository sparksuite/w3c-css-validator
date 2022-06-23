// Imports
import { W3CCSSValidatorResponse } from '.';
import BadStatusError from './bad-status-error';

// Utility function for retrieving response from W3C CSS Validator in a browser environment
const retrieveInBrowser = async (
	method: 'GET' | 'POST',
	parameters: string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	// Initialize controller who's signal will abort the fetch
	const controller = new AbortController();

	// Start timeout
	setTimeout(() => {
		controller.abort();
	}, timeout);

	// Attempt to fetch CSS validation, catching the abort error to handle specially
	let res: Response | null = null;

	try {
		res = await fetch(`https://jigsaw.w3.org/css-validator/validator${method === 'GET' ? parameters : ''}`, {
			method,
			signal: controller.signal,
			...(method === 'POST'
				? {
						headers: {
							'Content-Type': 'multipart/form-data; boundary=CSSValidatorBoundary',
							'Content-Length': String(parameters.length),
						},
						body: parameters,
				  }
				: {}),
		});

		if (!res.ok) {
			throw new BadStatusError(res.statusText, res.status);
		}
	} catch (err: unknown) {
		if (err instanceof Error && err.name === 'AbortError') {
			throw new Error(`The request took longer than ${timeout}ms`);
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
