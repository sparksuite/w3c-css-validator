// Imports
import buildFormData from './build-form-data';

// Tests
describe('#buildFormData()', () => {
	it('Handles text with no options', () => {
		expect(
			buildFormData({
				text: '.foo { color: red; }',
				medium: undefined,
				warningLevel: undefined,
			})
		).toBe(
			'--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="text"\r\n\r\n.foo { color: red; }\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="profile"\r\n\r\ncss3\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="output"\r\n\r\napplication/json\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="usermedium"\r\n\r\nall\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="warning"\r\n\r\nno\r\n--CSSValidatorBoundary'
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildFormData({
				text: '.foo { color: red; }',
				medium: 'braille',
				warningLevel: 3,
			})
		).toBe(
			'--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="text"\r\n\r\n.foo { color: red; }\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="profile"\r\n\r\ncss3\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="output"\r\n\r\napplication/json\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="usermedium"\r\n\r\nbraille\r\n--CSSValidatorBoundary\r\nContent-Disposition: form-data; name="warning"\r\n\r\n2\r\n--CSSValidatorBoundary'
		);
	});
});
