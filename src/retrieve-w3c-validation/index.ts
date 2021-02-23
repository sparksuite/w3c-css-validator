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
		}[];
		warnings?: {
			line: number;
			level: 0 | 1 | 2;
			message: string;
		}[];
	};
}

// Function that detects the appropriate HTTP request client and returns a response accordingly
const retrieveW3CValidation = async (url: string): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	if (typeof window?.fetch === 'function') {
		return await retrieveInBrowser(url);
	}

	return await retrieveInNode(url);
};

export default retrieveW3CValidation;
