// Imports
import getBoundary, { boundaryLength } from './get-boundary';

// Mocks

// Tests
describe('#boundaryLength', () => {
	it('Is the correct length', () => {
		expect(boundaryLength).toEqual(34);
	});
});

describe('#getBoundary()', () => {
	it('Returns a value of the expected length', () => {
		expect(getBoundary().length).toEqual(boundaryLength);
	});
});
