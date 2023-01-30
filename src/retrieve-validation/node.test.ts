//Imports
import BadStatusError from './bad-status-error';
import retrieveInNode from './node';

// Tests
describe('#retrieveInNode()', () => {
	afterEach(() => new Promise<void>((resolve) => setTimeout(resolve, 1000)));

	it('Retrieves the results from the W3C Validator API', async () => {
		expect(
			await retrieveInNode(
				'GET',
				'?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
				3000
			)
		).toStrictEqual({
			validity: true,
			checkedby: expect.any(String), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			csslevel: 'css3',
			date: expect.any(String), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			result: {
				errorcount: 0,
				warningcount: 0,
			},
			timestamp: expect.any(String), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			uri: expect.any(String), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
		});
	});

	it('Rejects when the request takes longer than the timeout', async () => {
		await expect(
			retrieveInNode(
				'GET',
				'?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
				1
			)
		).rejects.toThrow('The request took longer than 1ms');
	});

	it('Rejects status codes other than 200-300', async () => {
		try {
			await retrieveInNode('GET', `?usermedium=all&warning=no&output=application/json&profile=css3`, 3000);

			throw new Error('This test should not proceed to this point');
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(BadStatusError);

			if (!(error instanceof BadStatusError)) {
				return;
			}

			expect(error.message).toBe('Internal Server Error');
			expect(error.statusCode).toBe(500);
		}
	});

	it('Rejects unexpected errors', async () => {
		await expect(
			retrieveInNode(
				'GET',
				'?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/xml&profile=css3',
				3000
			)
		).rejects.toThrow();
	});
});
