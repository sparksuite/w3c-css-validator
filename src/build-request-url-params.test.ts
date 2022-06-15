// Imports
import buildRequestURLParams from './build-request-url-params';

// Tests
describe('#buildRequestURL()', () => {
	it('Handles parameters with URL value', () => {
		expect(
			buildRequestURLParams({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
			})
		).toBe(
			'uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildRequestURLParams({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: 'braille',
				warningLevel: 3,
			})
		).toBe(
			'uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=braille&warning=2&output=application/json&profile=css3'
		);
	});
});
