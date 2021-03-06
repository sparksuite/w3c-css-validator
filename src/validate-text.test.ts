// Imports
import validateText from './validate-text';

// Define the type separately so names don't conflict
type ValidateText = typeof validateText;

// Export this function so we can use it elsewhere
export default function testValidateText(validateText: ValidateText) {
	describe('#validateText()', () => {
		afterEach(
			() => new Promise<void>((resolve) => setTimeout(resolve, 1000))
		);

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
			expect(await validateText('.foo { text-align: center; ')).toStrictEqual({
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

		it('Complains about invalid medium', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateText('abc', { medium: 'fake' })).rejects.toThrow('The medium must be one of the following:');
		});

		it('Complains about invalid warning level', async () => {
			// @ts-expect-error: We're trying to force an error here
			await expect(validateText('abc', { warningLevel: 'fake' })).rejects.toThrow(
				'The warning level must be one of the following:'
			);
		});

		it('Parses out unwanted characters from error messages', async () => {
			const result = await validateText('.foo { foo: bar; }');

			expect(result.errors.length).toBeGreaterThan(0);
			for (const error of result.errors) {
				expect(error.message).not.toMatch(/ : /);
			}
		});
	});
}

testValidateText(validateText);
