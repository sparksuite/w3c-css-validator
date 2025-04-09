// Imports
import retrieveValidation from '.';
import retrieveInNode from './node';

// Mocks
jest.mock('./node');

// Tests
describe('#retrieveValidation()', () => {
	it('Uses retrieveInNode() when the Fetch API is not available', async () => {
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

		expect(retrieveInNode as jest.Mock).toBeCalled();
	});
});
