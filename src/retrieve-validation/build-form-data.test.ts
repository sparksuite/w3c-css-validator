// Imports
import buildFormData from './build-form-data';
import getBoundary from './get-boundary';

// Mocks
jest.mock('./get-boundary');

const boundary = '----CSSValidationBoundary0123456789';

(getBoundary as jest.Mock).mockReturnValue(boundary);

// Tests
describe('#buildFormData()', () => {
	it('Handles text with no options', () => {
		expect(
			buildFormData({
				text: '.foo { color: red; }',
				medium: undefined,
				warningLevel: undefined,
				profile: undefined,
			})
		).toBe(
			`--${boundary}\r\nContent-Disposition: form-data; name="text"\r\n\r\n.foo { color: red; }\r\n--${boundary}\r\nContent-Disposition: form-data; name="profile"\r\n\r\ncss3\r\n--${boundary}\r\nContent-Disposition: form-data; name="output"\r\n\r\napplication/json\r\n--${boundary}\r\nContent-Disposition: form-data; name="usermedium"\r\n\r\nall\r\n--${boundary}\r\nContent-Disposition: form-data; name="warning"\r\n\r\nno\r\n--${boundary}`
		);
	});

	it('Uses provided parameters over default values', () => {
		expect(
			buildFormData({
				text: '.foo { color: red; }',
				medium: 'braille',
				warningLevel: 3,
				profile: 'css3svg',
			})
		).toBe(
			`--${boundary}\r\nContent-Disposition: form-data; name="text"\r\n\r\n.foo { color: red; }\r\n--${boundary}\r\nContent-Disposition: form-data; name="profile"\r\n\r\ncss3svg\r\n--${boundary}\r\nContent-Disposition: form-data; name="output"\r\n\r\napplication/json\r\n--${boundary}\r\nContent-Disposition: form-data; name="usermedium"\r\n\r\nbraille\r\n--${boundary}\r\nContent-Disposition: form-data; name="warning"\r\n\r\n2\r\n--${boundary}`
		);
	});
});
