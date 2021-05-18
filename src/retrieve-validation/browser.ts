// Imports
import { W3CCSSValidatorResponse } from '.';

// Utility function for retrieving response from W3C CSS Validator in a browser environment
const retrieveInBrowser = async (url: string, timeout: number): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	// Initialize controller who's signal will abort the fetch
	const controller = new AbortController();

	// Start timeout
	setTimeout(() => {
		controller.abort();
	}, timeout);

	// Attempt to fetch CSS validation, catching the abort error to handle specially
	let res: Response | null = null;

	try {
		res = await fetch(url, { signal: controller.signal });
	} catch (err: unknown) {
		if (err instanceof Error && err.name === 'AbortError') {
			throw new Error(`The request took longer than ${timeout}ms`);
		}

		throw new Error(err);
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
