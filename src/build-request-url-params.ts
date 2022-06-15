// Imports
import { Options } from './types/options';

// Helper function that takes in parameters and builds a URL to make a request with
function buildRequestURLParams(parameters: Options & { url: string }): string {
	// Return request URL
	const params = {
		uri: encodeURIComponent(parameters.url),
		usermedium: parameters?.medium ?? 'all',
		warning: parameters.warningLevel ? parameters.warningLevel - 1 : 'no',
		output: 'application/json',
		profile: 'css3',
	};

	return Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&');
}

export default buildRequestURLParams;
