// Imports
import * as https from 'https';
import { W3CCSSValidatorResponse } from '.';
import BadStatusError from './bad-status-error';
import { boundaryLength } from './get-boundary';

// Utility function for retrieving response from W3C CSS Validator in a Node.js environment
const retrieveInNode = async (
	method: 'GET' | 'POST',
	parameters: string,
	timeout: number
): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	return new Promise((resolve, reject) => {
		// Attempt to fetch CSS validation
		const req = https.request(
			`https://jigsaw.w3.org/css-validator/validator${method === 'GET' ? parameters : ''}`,
			{
				method,
				timeout,
				...(method === 'POST'
					? {
							headers: {
								'Content-Type': `multipart/form-data; boundary=${parameters.slice(2, boundaryLength + 2)}`,
								'Content-Length': String(parameters.length),
							},
					  }
					: {}),
			},
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

		if (method === 'POST') {
			req.write(parameters);
		}

		// Listen for timeout event and reject in callback
		req.on('timeout', () => {
			reject(new Error(`The request took longer than ${timeout}ms`));
		});

		// End request
		req.end();
	});
};

export default retrieveInNode;
