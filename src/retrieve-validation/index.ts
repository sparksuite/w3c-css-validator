// Imports
import { W3CValidatorParameters } from '../types/parameters';
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
async function retrieveValidation(
	method: 'GET',
	parameters: string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']>;
async function retrieveValidation(
	method: 'POST',
	parameters: W3CValidatorParameters,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']>;
async function retrieveValidation(
	method: 'GET' | 'POST',
	parameters: W3CValidatorParameters | string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> {
	if (typeof window !== 'undefined' && typeof window?.fetch === 'function') {
		return await validateRetrievalCall(retrieveInBrowser, method, parameters, timeout);
	}

	return await validateRetrievalCall(retrieveInNode, method, parameters, timeout);
}

export default retrieveValidation;
