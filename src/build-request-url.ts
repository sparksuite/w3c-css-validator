// Imports
import { Parameters } from './types/parameters';

// Helper function that takes in parameters and builds a URL to make a request with
function buildRequestURL(parameters: Parameters): string {
	// Validate input
	if ('text' in parameters && 'uri' in parameters) {
		throw new Error('Only a text or a URI value can be provided');
	}

	// Return request URL
	const params = {
		...('text' in parameters && parameters.text !== undefined
			? {
					text: encodeURIComponent(parameters.text),
			  }
			: {
					uri: encodeURIComponent(parameters.uri),
			  }),
		usermedium: parameters?.medium ?? 'all',
		warning: parameters?.warningLevel ? parameters.warningLevel - 1 : 'no',
		output: 'application/json',
		profile: 'css3',
	};

	return `https://jigsaw.w3.org/css-validator/validator?${Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&')}`;
}

export default buildRequestURL;
