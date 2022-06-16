/**
 * @jest-environment jsdom
 */

// Imports
import retrieveValidation from '.';
import retrieveInBrowser from './browser';
import 'whatwg-fetch';

// Mocks
jest.mock('./browser');

// Tests
describe('#retrieveValidation()', () => {
	it('Uses retrieveInBrowser() when the Fetch API is available', async () => {
		require('whatwg-fetch');

		await retrieveValidation(
			'GET',
			'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
			3000
		);

		expect(retrieveInBrowser as jest.Mock).toBeCalled();
	});
});
