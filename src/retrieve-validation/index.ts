// Imports
import retrieveInBrowser from './browser';
import retrieveInNode from './node';

// Define types
export interface W3CCSSValidatorResponse {
	cssvalidation: {
		validity: boolean;
		errors?: {
			line: number;
			message: string;
			source?: string;
		}[];
		warnings?: {
			line: number;
			level: 0 | 1 | 2;
			message: string;
			source?: string;
		}[];
	};
}

// Function that detects the appropriate HTTP request client and returns a response accordingly
const retrieveValidation = async (
	method: 'GET',
	url: string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	if (typeof window !== 'undefined' && typeof window?.fetch === 'function') {
		return await retrieveInBrowser(method, url, timeout);
	}

	return await retrieveInNode(method, url, timeout);
};

export default retrieveValidation;
