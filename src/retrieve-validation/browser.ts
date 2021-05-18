// Imports
import { W3CCSSValidatorResponse } from '.';

// Utility function for retrieving response from W3C CSS Validator in a browser environment
const retrieveInBrowser = async (url: string, timeout?: number): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	const controller = new AbortController();

	if (timeout !== undefined) {
		setTimeout(() => {
			controller.abort();
		}, timeout);
	}

	let res: Response | null = null;

	try {
		res = await fetch(url, { signal: timeout !== undefined ? controller.signal : undefined });
	} catch (err) {
		if ((err as Error).name === 'AbortError') {
			throw new Error(
				`The request took longer than ${timeout !== undefined ? `${timeout}ms` : "the browser's default timeout"}`
			);
		}

		throw new Error(err);
	}

	if (!res) {
		throw new Error('Response expected');
	}

	const data = (await res.json()) as W3CCSSValidatorResponse;

	return data.cssvalidation;
};

export default retrieveInBrowser;
