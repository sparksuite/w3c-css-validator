// Imports
import retrieveValidation from '.';
import retrieveInNode from './node';

// Mocks
jest.mock('./node');

// Tests
describe('#retrieveValidation()', () => {
	it('Uses retrieveInNode() when the Fetch API is not available', async () => {
		await retrieveValidation('POST', { text: '.foo { text-align: center; }', usermedium: 'all', warning: 'no' }, 3000);

		expect(retrieveInNode as jest.Mock).toBeCalled();
	});
});
