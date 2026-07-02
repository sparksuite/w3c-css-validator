/**
 * @jest-environment jsdom
 */

// Imports
import retrieveValidation from '.';
import retrieveInBrowser from './browser';
import 'whatwg-fetch';

// Mocks
jest.mock('./browser');

// Declare type
declare const process: {
	env: Record<string, string>
}

// Tests
describe('#retrieveValidation()', () => {
	it('Uses retrieveInBrowser() when the Fetch API is available', async () => {
		require('whatwg-fetch');
		
		if(process?.env?.CSS_VALIDATOR_URL){
			window.CSS_VALIDATOR_URL = process?.env?.CSS_VALIDATOR_URL;
		}
		
		await retrieveValidation(
			'GET',
			{
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
				profile: undefined,
			},
			3000
		);

		expect(retrieveInBrowser as jest.Mock).toBeCalled();
	});
});
