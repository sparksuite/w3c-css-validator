// Imports
import path from 'path';

// Setup work before each test
beforeEach(async () => {
	await jestPuppeteer.resetPage();

	await page.goto(`file://${path.join(__dirname, 'index.html')}`, {
		waitUntil: 'load',
	});
});

it('Loads', async () => {
	await expect(page.title()).resolves.toMatch('Hello World!');
});
