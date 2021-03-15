// Imports
import cssValidator from './index';

// Tests
it('Returns an object with the necessary functions', async () => {
	expect(cssValidator).toMatchObject({
		validateText: expect.any(Function), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
	});
});
