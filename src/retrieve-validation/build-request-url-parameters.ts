// Imports
import { Parameters } from '../types/parameters';

// Helper function that takes in parameters and builds a URL to make a request with
function buildRequestURLParameters(parameters: Extract<Parameters, { url: string }>): string {
	// Return request URL
	const params = {
		uri: encodeURIComponent(parameters.url),
		usermedium: parameters?.medium ?? 'all',
		warning: parameters?.warningLevel ? parameters.warningLevel - 1 : 'no',
		output: 'application/json',
		profile: parameters.profile ?? 'css3',
	};

	return `?${Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&')}`;
}

export default buildRequestURLParameters;
