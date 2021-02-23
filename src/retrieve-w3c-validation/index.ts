// Imports
import { W3CCSSValidatorResponse } from '../types';
import retrieveForBrowser from './browser';
import retrieveForNode from './node';

// Function that detects the appropriate HTTP request client and returns a response accordingly
const retrieveW3CValidation = async (url: string): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	if (typeof window?.fetch === 'function') {
		return await retrieveForBrowser(url);
	}

	return await retrieveForNode(url);
};

export default retrieveW3CValidation;
