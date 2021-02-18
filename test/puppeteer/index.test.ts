// Setup work before each test
beforeEach(async () => {
	await jestPuppeteer.resetPage();

	await page.goto(`http://localhost:8080/`, {
		waitUntil: 'load',
	});
});

// Tests
it('Loads', async () => {
	await expect(page.title()).resolves.toMatch('Hello world!');
});
