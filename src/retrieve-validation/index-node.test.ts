// Imports
import retrieveValidation from '.';
import retrieveInNode from './node';

// Mocks
jest.mock('./node');

// Tests
describe('#retrieveValidation()', () => {
	it('Uses retrieveInNode() when the Fetch API is not available', async () => {
		await retrieveValidation(
			'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
			3000
		);

		expect(retrieveInNode as jest.Mock).toBeCalled();
	});
});
