// Imports
import getBoundary from './get-boundary';

// Mocks

// Tests
describe('#getBoundary()', () => {
	it('Returns the same value when called multiple times', () => {
		expect(getBoundary()).toEqual(getBoundary());
	});
});
