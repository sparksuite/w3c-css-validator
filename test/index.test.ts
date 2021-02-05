import helloWorld from '../src/index';

describe('#helloWorld()', () => {
	it('Works', () => {
		expect(helloWorld()).toEqual('Hello world!');
	});
});
