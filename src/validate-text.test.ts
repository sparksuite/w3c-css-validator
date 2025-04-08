// Imports
import validateText from './validate-text';

// Define the type separately so names don't conflict
type ValidateText = typeof validateText;

// Export this function so we can use it elsewhere
export default function testValidateText(validateText: ValidateText): void {
	describe('#validateText()', () => {
		afterEach(() => new Promise<void>((resolve) => setTimeout(resolve, 1000)));

		it('Returns the validity and errors when no options are provided', async () => {
			expect(await validateText('.foo { text-align: center; }')).toStrictEqual({
				valid: true,
				errors: [],
			});
		});

		it('Returns the validity, errors, and warnings when a warning level option is provided', async () => {
			expect(await validateText('.foo { text-align: center; }', { warningLevel: 1 })).toStrictEqual({
				valid: true,
				errors: [],
				warnings: [],
			});
		});

		it('Includes errors present in the response on the result', async () => {
			expect(await validateText('.foo { text-align: invalid-value; }')).toStrictEqual({
				valid: false,
				errors: [
					{
						line: 1,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						message: expect.any(String),
					},
				],
			});
		});

		it('Includes warnings present in the response on the result when options specify a warning level', async () => {
			expect(await validateText('.foo { font-family: Georgia; }', { warningLevel: 3 })).toStrictEqual({
				valid: true,
				errors: [],
				warnings: [
					{
						level: 3,
						line: 1,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						message: expect.any(String),
					},
				],
			});
		});

		it('Does not include warnings on the result when warnings aren’t enabled', async () => {
			expect(await validateText('.foo { font-family: Georgia; }')).toStrictEqual({
				valid: true,
				errors: [],
			});

			expect(await validateText('.foo { font-family: Georgia; }', { warningLevel: 0 })).toStrictEqual({
				valid: true,
				errors: [],
			});
		});

		it('Complains about missing text', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateText()).rejects.toThrow('You must pass in text to be validated');
			await expect(validateText('')).rejects.toThrow('You must pass in text to be validated');
		});

		it('Complains about text not being a string', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateText(true)).rejects.toThrow('The text to be validated must be a string');
		});

		it('Throws when the timeout is passed', async () => {
			await expect(validateText('abc', { timeout: 1 })).rejects.toThrow('The request took longer than 1ms');
		});

		it('Parses out unwanted characters from error messages', async () => {
			const result = await validateText('.foo { foo: bar; }');

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
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated, { profile: 'css21' });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
						profile: 'css21',
					}),
					expect.any(Number)
				);
			});

			it('Passes default css3 profile when no profile is specified', async () => {
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated);

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
						profile: undefined,
					}),
					expect.any(Number)
				);
			});

			it('Passes medium option to retrieveValidation', async () => {
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated, { medium: 'print' });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
						medium: 'print',
					}),
					expect.any(Number)
				);
			});

			it('Passes warningLevel option to retrieveValidation', async () => {
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated, { warningLevel: 2 });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
						warningLevel: 2,
					}),
					expect.any(Number)
				);
			});

			it('Passes timeout option to retrieveValidation', async () => {
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated, { timeout: 5000 });

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
					}),
					5000
				);
			});

			it('Passes all options together to retrieveValidation', async () => {
				const textToBeValidated = '.foo { color: blue; }';
				await validateText(textToBeValidated, {
					profile: 'css3svg',
					medium: 'screen',
					warningLevel: 3,
					timeout: 15000,
				});

				expect(mockRetrieveValidation).toHaveBeenCalledWith(
					'POST',
					expect.objectContaining({
						text: textToBeValidated,
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

testValidateText(validateText);
