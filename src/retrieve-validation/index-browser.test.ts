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
			{
				text: '.foo { text-align: center; }',
				medium: undefined,
				warningLevel: undefined,
			},
			3000
		);

		expect(retrieveInBrowser as jest.Mock).toBeCalled();
	});
});
