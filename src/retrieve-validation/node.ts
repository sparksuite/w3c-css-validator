// Imports
import * as https from 'https';
import { W3CCSSValidatorResponse } from '.';

// Utility function for retrieving response from W3C CSS Validator in a Node.js environment
const retrieveInNode = async (url: string, timeout: number): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	return new Promise((resolve, reject) => {
		// Attempt to fetch CSS validation
		const req = https.get(
			url,
			{
				timeout,
			},
			(res) => {
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

		// Listen for timeout event and reject in callback
		req.on('timeout', () => {
			reject(new Error(`The request took longer than ${timeout}ms`));
		});
	});
};

export default retrieveInNode;
