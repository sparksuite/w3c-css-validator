// Imports
import buildRequestURLParameters from "./build-request-url-parameters";
import processParameters from "./process-parameters";

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
});
