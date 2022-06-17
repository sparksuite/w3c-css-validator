// Imports
import buildRequestURLParameters from './build-request-url-parameters';

// Tests
describe('#buildRequestURLParameters()', () => {
	it('Handles parameters with text value', () => {
		expect(
			buildRequestURLParameters({
				text: '.foo { text-align: center; }',
				medium: undefined,
				warningLevel: undefined,
			})
		).toBe(
			'?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Handles parameters with URL value', () => {
		expect(
			buildRequestURLParameters({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
			})
		).toBe(
			'?uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildRequestURLParameters({
				text: '.foo { text-align: center; }',
				medium: 'braille',
				warningLevel: 3,
			})
		).toBe(
			'?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=braille&warning=2&output=application/json&profile=css3'
		);
	});

	it('Complains if text and URL values are provided simultaneously', () => {
		expect(() =>
			// @ts-expect-error: We're trying to force an error here
			buildRequestURLParameters({
				text: '.foo { text-align: center; }',
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
			})
		).toThrow('Only a text or a URL value can be provided');
	});
});
