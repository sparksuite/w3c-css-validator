// Imports
import buildFormData from './build-form-data';
import buildRequestURLParameters from './build-request-url-parameters';
import getBoundary from './get-boundary';
import processParameters from './process-parameters';

// Mocks
jest.mock('./get-boundary');

(getBoundary as jest.Mock).mockReturnValue('----CSSValidationBoundary0123456789');

// Tests
describe('#processParameters()', () => {
	it('Returns URL parameters for GET requests', () => {
		const parameters = {
			url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
			medium: undefined,
			warningLevel: undefined,
		};

		expect(processParameters('GET', parameters)).toBe(buildRequestURLParameters(parameters));
	});

	it('Returns form data for POST requests', () => {
		const parameters = {
			text: '.foo { text-align: center; }',
			medium: undefined,
			warningLevel: undefined,
		};

		expect(processParameters('POST', parameters)).toBe(buildFormData(parameters));
	});

	it('Throws an error if an unrecognized method is used', () => {
		const parameters = {
			text: '.foo { text-align: center; }',
			medium: undefined,
			warningLevel: undefined,
		};

		// @ts-expect-error We are trying to throw an error here
		expect(() => processParameters('PATCH', parameters)).toThrow(
			'Parameter processing called with unrecognized method: PATCH'
		);
	});

	it('Throws an error if a GET request is made with a `text` parameter', () => {
		const parameters = {
			text: '.foo { text-align: center; }',
			medium: undefined,
			warningLevel: undefined,
		};

		expect(() => processParameters('GET', parameters)).toThrow(
			'A GET request is not supported with validation by text'
		);
	});

	it('Throws an error if a POST request is made with a `url` parameter', () => {
		const parameters = {
			url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
			medium: undefined,
			warningLevel: undefined,
		};

		expect(() => processParameters('POST', parameters)).toThrow(
			'A POST request is not supported with validation by URL'
		);
	});
});
