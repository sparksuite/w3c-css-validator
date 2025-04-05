// Imports
import validateText from './validate-text';
import validateURL from './validate-url';
import retrieveValidation from './retrieve-validation';

// Mock the retrieveValidation module
jest.mock('./retrieve-validation', () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return jest.fn().mockImplementation((_method, _parameters, _timeout) => {
		return Promise.resolve({
			validity: true,
			errors: [],
			warnings: [],
		});
	});
});

// Tests for profile option
describe('Profile option', () => {
	beforeEach(() => {
		// Reset mock before each test
		(retrieveValidation as jest.Mock).mockClear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should pass profile option to retrieveValidation from validateURL', async () => {
		await validateURL('http://example.com/style.css', { profile: 'css3svg' });

		expect(retrieveValidation).toHaveBeenCalledTimes(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const callArgs = (retrieveValidation as jest.Mock).mock.calls[0];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		expect(callArgs[1].profile).toBe('css3svg');
	});

	it('should pass profile option to retrieveValidation from validateText', async () => {
		await validateText('.foo { color: red; }', { profile: 'css3svg' });

		expect(retrieveValidation).toHaveBeenCalledTimes(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const callArgs = (retrieveValidation as jest.Mock).mock.calls[0];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		expect(callArgs[1].profile).toBe('css3svg');
	});
});
