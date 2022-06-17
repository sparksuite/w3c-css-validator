// Imports
import buildRequestURL from '../build-request-url';
import { Parameters } from '../types/parameters';
import validateOptions from '../validate-options';
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
	unprocessedParameters: Parameters,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	// Validate options
	validateOptions({
		timeout,
		medium: unprocessedParameters.medium,
		warningLevel: unprocessedParameters.warningLevel,
	});

	// Build request URL
	const url = buildRequestURL(unprocessedParameters);

	// Retrieve response in browser environments
	if (typeof window !== 'undefined' && typeof window?.fetch === 'function') {
		return await retrieveInBrowser(method, url, timeout);
	}

	// Retrieve response in Node.js environments
	return await retrieveInNode(method, url, timeout);
};

export default retrieveValidation;
