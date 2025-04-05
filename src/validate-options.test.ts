// Imports
import validateOptions from './validate-options';

// Tests
describe('#validateOptions()', () => {
	it('Ignores no options', async () => {
		expect(() => validateOptions(undefined)).not.toThrow();
	});

	it('Ignores valid options', async () => {
		expect(() =>
			validateOptions({
				medium: 'braille',
				warningLevel: 1,
				timeout: 1000,
				profile: 'css3svg',
			})
		).not.toThrow();
	});

	it('Complains about invalid medium', async () => {
		// @ts-expect-error: We're trying to force an error here
		expect(() => validateOptions({ medium: 'fake' })).toThrow('The medium must be one of the following:');
	});

	it('Complains about invalid warning level', async () => {
		// @ts-expect-error: We're trying to force an error here
		expect(() => validateOptions({ warningLevel: 'fake' })).toThrow('The warning level must be one of the following:');
	});

	it('Complains about negative timeout', async () => {
		expect(() => validateOptions({ timeout: -1 })).toThrow('The timeout must be a positive integer');
	});

	it('Complains about non-integer times', async () => {
		expect(() => validateOptions({ timeout: Infinity })).toThrow('The timeout must be an integer');
		expect(() => validateOptions({ timeout: 400.1 })).toThrow('The timeout must be an integer');
	});

	it('Complains about invalid profile', async () => {
		// @ts-expect-error: We're trying to force an error here
		expect(() => validateOptions({ profile: 'fake' })).toThrow('The profile must be one of the following:');
	});
});
