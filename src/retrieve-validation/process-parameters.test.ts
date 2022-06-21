// Imports
import buildRequestURLParameters from './build-request-url-parameters';
import processParameters from './process-parameters';

// Tests
describe('#processParameters()', () => {
	it('Returns URL parameters for GET requests', () => {
		const parameters = {
			text: '.foo { text-align: center; }',
			medium: undefined,
			warningLevel: undefined,
		};

		expect(processParameters('GET', parameters)).toBe(buildRequestURLParameters(parameters));
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
});
