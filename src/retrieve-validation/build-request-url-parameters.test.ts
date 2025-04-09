// Imports
import buildRequestURLParameters from './build-request-url-parameters';

// Tests
describe('#buildRequestURLParameters()', () => {
	it('Handles parameters with URL value', () => {
		expect(
			buildRequestURLParameters({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: undefined,
				warningLevel: undefined,
				profile: undefined,
			})
		).toBe(
			'?uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=all&warning=no&output=application/json&profile=css3'
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildRequestURLParameters({
				url: 'https://raw.githubusercontent.com/sparksuite/w3c-css-validator/master/public/css/valid.css',
				medium: 'braille',
				warningLevel: 3,
				profile: 'css3svg',
			})
		).toBe(
			'?uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsparksuite%2Fw3c-css-validator%2Fmaster%2Fpublic%2Fcss%2Fvalid.css&usermedium=braille&warning=2&output=application/json&profile=css3svg'
		);
	});
});
