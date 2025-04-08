// Imports
import validateURL from './validate-url';

// Define the type separately so names don't conflict
type ValidateURL = typeof validateURL;

// Export this function so we can use it elsewhere
export default function testValidateURL(validateURL: ValidateURL): void {
	describe('#validateURL()', () => {
		afterEach(() => new Promise<void>((resolve) => setTimeout(resolve, 1000)));

		it('Returns the validity and errors when no options are provided', async () => {
			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/valid.css'
				)
			).toStrictEqual({
				valid: true,
				errors: [],
			});
		});

		it('Returns the validity, errors, and warnings when a warning level option is provided', async () => {
			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/valid.css',
					{ warningLevel: 1 }
				)
			).toStrictEqual({
				valid: true,
				errors: [],
				warnings: [],
			});
		});

		it('Includes errors present in the response on the result', async () => {
			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/76341fda26fd16021155ea853d6e4d7db0e194c4/public/css/error.css'
				)
			).toStrictEqual({
				valid: false,
				errors: [
					{
						line: 1,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						message: expect.any(String),
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						url: expect.any(String),
					},
				],
			});
		});

		it('Includes warnings present in the response on the result when options specify a warning level', async () => {
			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/warning.css',
					{ warningLevel: 3 }
				)
			).toStrictEqual({
				valid: true,
				errors: [],
				warnings: [
					{
						level: 3,
						line: 2,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						message: expect.any(String),
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						url: expect.any(String),
					},
				],
			});
		});

		it('Does not include warnings on the result when warnings aren’t enabled', async () => {
			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/warning.css'
				)
			).toStrictEqual({
				valid: true,
				errors: [],
			});

			expect(
				await validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/warning.css',
					{ warningLevel: 0 }
				)
			).toStrictEqual({
				valid: true,
				errors: [],
			});
		});

		it('Complains about missing URL', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateURL()).rejects.toThrow('You must pass in a URL to be validated');
			await expect(validateURL('')).rejects.toThrow('You must pass in a URL to be validated');
		});

		it('Complains about URL not being a string', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateURL(true)).rejects.toThrow('The URL to be validated must be a string');
		});

		it('Throws when the timeout is passed', async () => {
			await expect(
				validateURL(
					'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/valid.css',
					{ timeout: 1 }
				)
			).rejects.toThrow('The request took longer than 1ms');
		});

		it('Parses out unwanted characters from error messages', async () => {
			const result = await validateURL(
				'https://rawcdn.githack.com/sparksuite/w3c-css-validator/76341fda26fd16021155ea853d6e4d7db0e194c4/public/css/error.css'
			);

			expect(result.errors.length).toBeGreaterThan(0);
			for (const error of result.errors) {
				expect(error.message).not.toMatch(/ : /);
			}
		});

		describe('Options passing', () => {
			let mockRetrieveValidation: jest.SpyInstance;

			beforeEach(() => {
				mockRetrieveValidation = jest.spyOn(require('./retrieve-validation'), 'default').mockImplementation(() => ({
					validity: true,
					errors: [],
				}));
			});

			afterEach(() => {
				mockRetrieveValidation.mockRestore();
			});

			it('Passes profile option to retrieveValidation', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated, { profile: 'css21' });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
						profile: 'css21',
					}),
					expect.any(Number)
				);
			});

			it('Passes default css3 profile when no profile is specified', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated);

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
						profile: undefined,
					}),
					expect.any(Number)
				);
			});

			it('Passes medium option to retrieveValidation', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated, { medium: 'print' });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
						medium: 'print',
					}),
					expect.any(Number)
				);
			});

			it('Passes warningLevel option to retrieveValidation', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated, { warningLevel: 2 });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
						warningLevel: 2,
					}),
					expect.any(Number)
				);
			});

			it('Passes timeout option to retrieveValidation', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated, { timeout: 5000 });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
					}),
					5000
				);
			});

			it('Passes all options together to retrieveValidation', async () => {
				const urlToBeValidated = 'https://example.com/style.css';
				await validateURL(urlToBeValidated, {
					profile: 'css3svg',
					medium: 'screen',
					warningLevel: 3,
					timeout: 15000,
				});

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'GET',
					expect.objectContaining({
						url: urlToBeValidated,
						profile: 'css3svg',
						medium: 'screen',
						warningLevel: 3,
					}),
					15000
				);
			});
		});
	});
}

testValidateURL(validateURL);
