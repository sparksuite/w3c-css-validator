//Imports
import BadStatusError from './bad-status-error';
import retrieveFromNode from './node';

// Tests
describe('#retrieveFromNode()', () => {
	afterEach(
		() => new Promise<void>((resolve) => setTimeout(resolve, 1000))
	);

	it('Retrieves the results from the W3C Validator API', async () => {
		expect(
			await retrieveFromNode(
				'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
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
			retrieveFromNode(
				'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3',
				1
			)
		).rejects.toThrow('The request took longer than 1ms');
	});

	it('Rejects status codes other than 200-300', async () => {
		try {
			await retrieveFromNode(
				`https://jigsaw.w3.org/css-validator/validator?text=${encodeURIComponent(
					'* { color: black }\n'.repeat(750)
				)}&usermedium=all&warning=no&output=application/json&profile=css3`,
				3000
			);

			throw new Error('This test should not proceed to this point');
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(BadStatusError);

			if (!(error instanceof BadStatusError)) {
				return;
			}

			expect(error.message).toBe('Bad request (This may be due to trying to validate too much CSS at once)');
			expect(error.statusCode).toBe(400);
		}
	});

	it('Rejects unexpected errors', async () => {
		await expect(
			retrieveFromNode(
				'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/xml&profile=css3',
				3000
			)
		).rejects.toThrow();
	});
});