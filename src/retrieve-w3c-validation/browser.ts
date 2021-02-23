// Imports
import { W3CCSSValidatorResponse } from '.';

// Utility function for retrieving response from W3C CSS Validator in a browser environment
const retrieveForBrowser = async (url: string): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	const res = await fetch(url);
	const data = (await res.json()) as W3CCSSValidatorResponse;

	return data.cssvalidation;
};

export default retrieveForBrowser;
