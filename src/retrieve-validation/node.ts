// Imports
import * as https from 'https';
import { W3CCSSValidatorResponse } from '.';

// Utility function for retrieving response from W3C CSS Validator in a Node.js environment
const retrieveInNode = async (url: string, timeout: number): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
	return new Promise((resolve, reject) => {
		const req = https.get(
			url,
			{
				timeout,
			},
			(res) => {
				let data = '';

				res.on('data', (chunk) => {
					data += chunk;
				});

				res.on('end', () => {
					resolve((JSON.parse(data) as W3CCSSValidatorResponse).cssvalidation);
				});
			}
		);

		req.on('timeout', () => {
			reject(new Error(`The request took longer than ${timeout}ms`));
		});
	});
};

export default retrieveInNode;
