// Imports
import * as https from 'https';
import retrieveValidation, { W3CCSSValidatorResponse } from '.';
import BadStatusError from './bad-status-error';
import FormData from 'form-data';
import { W3CValidatorParameters } from '../types/parameters';

// Utility function for retrieving response from W3C CSS Validator in a Node.js environment
const retrieveInNode: typeof retrieveValidation = async (
	method: string,
	parameters: W3CValidatorParameters | string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	// Build form data
	let formData: FormData | undefined = undefined;

	if (method === 'POST') {
		formData = new FormData();

		for (const [key, value] of Object.entries(parameters)) {
			formData.append(key, value);
		}

		formData.append('output', 'application/json');
		formData.append('profile', 'css3');
	}

	// Build request options
	const requestOptions: https.RequestOptions = {
		method,
		timeout,
	};

	if (method === 'POST') {
		requestOptions.headers = formData?.getHeaders();
	}

	// Return
	return new Promise((resolve, reject) => {
		// Attempt to fetch CSS validation
		const req = https.request(
			`https://jigsaw.w3.org/css-validator/validator${
				method === 'GET' && typeof parameters === 'string' ? `?${parameters}` : ''
			}`,
			requestOptions,
			(res) => {
				if (typeof res.statusCode === 'number' && (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new BadStatusError(res.statusMessage ?? '', res.statusCode));
				}

				let data = '';

				res.on('data', (chunk) => {
					try {
						data += chunk;
					} catch (error) {
						reject(error);
					}
				});

				res.on('end', () => {
					try {
						resolve((JSON.parse(data) as W3CCSSValidatorResponse).cssvalidation);
					} catch (error) {
						reject(error);
					}
				});
			}
		);

		formData?.pipe(req);

		// Listen for timeout event and reject in callback
		req.on('timeout', () => {
			reject(new Error(`The request took longer than ${timeout}ms`));
		});

		// End of request
		req.end();
	});
};

export default retrieveInNode;
