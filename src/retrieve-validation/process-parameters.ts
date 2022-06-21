// Imports
import retrieveValidation from '.';
import buildRequestURLParameters from './build-request-url-parameters';
import { Parameters as RequestParameters } from '../types/parameters';

// Function that processes parameters into the correct data type / structure based on the request method
const processParameters = (method: Parameters<typeof retrieveValidation>[0], parameters: RequestParameters): string => {
	// Handle parameters for GET method
	if (method === 'GET') {
		return buildRequestURLParameters(parameters);
	}


	// Handle parameters for POST method
	if (method === 'POST') {
		return JSON.stringify(parameters);
	}

	// Throw if an unrecognized parameter is provided
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- This should be unreachable
	throw new Error(`Parameter processing called with unrecognized method: ${method}`);
};

export default processParameters;
