// Imports
import { Parameters } from '../types/parameters';

// Helper function that takes in parameters and builds a URL to make a request with
function buildRequestURLParameters(parameters: Parameters): string {
	// Validate input
	if ('text' in parameters && 'url' in parameters) {
		throw new Error('Only a text or a URL value can be provided');
	}

	// Return request URL
	const params = {
		...('text' in parameters && parameters.text !== undefined
			? {
					text: encodeURIComponent(parameters.text),
			  }
			: {
					uri: encodeURIComponent(parameters.url),
			  }),
		usermedium: parameters?.medium ?? 'all',
		warning: parameters?.warningLevel ? parameters.warningLevel - 1 : 'no',
		output: 'application/json',
		profile: 'css3',
	};

	return `?${Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&')}`;
}

export default buildRequestURLParameters;
