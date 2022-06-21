// Imports
import * as https from 'https';
import retrieveValidation, { W3CCSSValidatorResponse } from '.';
import BadStatusError from './bad-status-error';
import FormData from 'form-data';
import { W3CValidatorParameters } from '../types/parameters';

// Utility function for retrieving response from W3C CSS Validator in a Node.js environment
const retrieveInNode = async (
	method: 'GET',
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

		formData?.pipe(req);

		// Listen for timeout event and reject in callback
		req.on('timeout', () => {
			reject(new Error(`The request took longer than ${timeout}ms`));
		});

		// End request
		req.end();
	});
};

export default retrieveInNode;
