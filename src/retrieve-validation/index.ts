// Imports
import { Parameters } from '../types/parameters';
import validateOptions from '../validate-options';
import retrieveInBrowser from './browser';
import retrieveInNode from './node';
import processParameters from './process-parameters';

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

// Helper function that checks if a function has been called with the correct types and throws an error otherwise
const validateRetrievalCall = async (
	retrievalFunction: typeof retrieveValidation,
	method: 'GET' | 'POST',
	parameters: W3CValidatorParameters | string,
	timeout: number
): ReturnType<typeof retrieveValidation> => {
	if (method === 'GET' && typeof parameters === 'string') {
		return await retrievalFunction(method, parameters, timeout);
	}

	if (method === 'POST' && typeof parameters === 'object') {
		return await retrievalFunction(method, parameters, timeout);
	}

	throw new Error('Validation function called with unsupported parameters');
};

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

	// Process request parameters
	const parameters = processParameters(method, unprocessedParameters);

	// Retrieve response in browser environments
	if (typeof window !== 'undefined' && typeof window?.fetch === 'function') {
		return await retrieveInBrowser(method, parameters, timeout);
	}

	// Retrieve response in Node.js environments
	return await retrieveInNode(method, parameters, timeout);
};

export default retrieveValidation;
