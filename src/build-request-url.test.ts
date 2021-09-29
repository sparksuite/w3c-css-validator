// Imports
import buildRequestURL from './build-request-url';

// Tests
describe('#buildRequestURL()', () => {
	it('Handles parameters with text value', () => {
		expect(
			buildRequestURL({
				text: '.foo { text-align: center; }',
				medium: undefined,
				warningLevel: undefined,
			})
		).toBe(
			'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Handles parameters with URL value', () => {
		expect(
			buildRequestURL({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
			})
		).toBe(
			'https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildRequestURL({
				text: '.foo { text-align: center; }',
				medium: 'braille',
				warningLevel: 3,
			})
		).toBe(
			'https://jigsaw.w3.org/css-validator/validator?text=.foo%20%7B%20text-align%3A%20center%3B%20%7D&usermedium=braille&warning=2&output=application/json&profile=css3'
		);
	});

	it('Complains if text and URL values are provided simultaneously', () => {
		expect(() =>
			buildRequestURL({
				text: '.foo { text-align: center; }',
				// @ts-expect-error: We're trying to force an error here
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
			})
		).toThrow('Only a text or a URL value can be provided');
	});
});
