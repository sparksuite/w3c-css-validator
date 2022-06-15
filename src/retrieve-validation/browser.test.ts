/**
 * @jest-environment jsdom
 */

//Imports
import retrieveFromBrowser from './browser';
import 'whatwg-fetch';
import BadStatusError from './bad-status-error';

// Tests
describe('#retrieveFromBrowser()', () => {
	afterEach(
		() => new Promise<void>((resolve) => setTimeout(resolve, 1000))
	);

	it('Retrieves the results from the W3C Validator API', async () => {
		expect(
			await retrieveFromBrowser(
				'POST',
				{ text: '.foo { text-align: center; }', usermedium: 'all', warning: 'no' },
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
			retrieveFromBrowser('POST', { text: '.foo { text-align: center; }', usermedium: 'all', warning: 'no' }, 1)
		).rejects.toThrow('The request took longer than 1ms');
	});

	it('Rejects status codes other than 200-300', async () => {
		try {
			// @ts-expect-error We are purposely giving bad parameters here for testing purposes
			await retrieveFromBrowser('POST', { usermedium: 'all', warning: 'no' }, 3000);

			throw new Error('This test should not proceed to this point');
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(BadStatusError);

			if (!(error instanceof BadStatusError)) {
				return;
			}

			expect(error.statusCode).toBe(500);
		}
	});
});
