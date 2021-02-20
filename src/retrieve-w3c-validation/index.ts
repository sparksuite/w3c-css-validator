// Imports
import { W3CCSSValidatorResponse } from '../types';
import retrieveForNode from './retrieveForNode';

// Function that detects the appropriate HTTP request client and returns a response accordingly
const retrieveW3CValidation = async (url: string): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	if (typeof window?.fetch === 'function') {
		const res = await fetch(url);
		const data = (await res.json()) as W3CCSSValidatorResponse;

		return data.cssvalidation;
	}

	return await retrieveForNode(url);
};

export default retrieveW3CValidation;
