// Helper functions used in multiple tests
const waitForResponse = async (options?: { expectErrors?: true; expectWarnings?: true }): Promise<void> => {
	await page.waitForFunction(
		"document.querySelector('#is-valid').innerText === 'true' || document.querySelector('#is-valid').innerText === 'false'"
	);

	if (options?.expectErrors) {
		await page.waitForFunction("document.querySelector('#errors').childElementCount > 0");
	}

	if (options?.expectWarnings) {
		await page.waitForFunction("document.querySelector('#warnings').childElementCount > 0");
	}
};

// Tests
describe('#validateText()', () => {
	// Setup work before each test
	beforeEach(async () => {
		await jestPuppeteer.resetPage();

		await page.goto(`http://localhost:8080/`, {
			waitUntil: 'load',
		});

		await page.select('#method', 'validateText');
	});

	// Wait after each test, see "Note" section under https://jigsaw.w3.org/css-validator/manual.html#expert
	afterEach(() => new Promise<void>((resolve) => setTimeout(resolve, 1000)));

	// Tests
	it('Loads', async () => {
		await expect(page.title()).resolves.toMatch('Hello world!');
	});

	it('Returns the validity', async () => {
		await page.type('#custom-css', '.foo { text-align: center; }');
		await page.click('#make-call');

		await waitForResponse();
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
	});

	it('Includes errors present in the response on the result', async () => {
		await page.type('#custom-css', '.foo { text-align: invalid-value; }');
		await page.click('#make-call');

		await waitForResponse({ expectErrors: true });
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('false');
		expect(
			await page.evaluate(() => document.querySelector<HTMLUListElement>('#errors')?.childElementCount)
		).toBeGreaterThan(0);
	});

	it('Includes warnings present in the response on the result when options specify a warning level', async () => {
		await page.type('#custom-css', '.foo { font-family: Georgia; }');
		await page.select('#warning-level', '3');
		await page.click('#make-call');

		await waitForResponse({ expectWarnings: true });
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
		expect(
			await page.evaluate(() => document.querySelector<HTMLUListElement>('#warnings')?.childElementCount)
		).toBeGreaterThan(0);
	});

	it('Does not include warnings on the result when warnings aren’t enabled', async () => {
		await page.type('#custom-css', '.foo { font-family: Georgia; }');
		await page.select('#warning-level', '0');
		await page.click('#make-call');

		await waitForResponse();
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
		expect(await page.evaluate(() => document.querySelector<HTMLUListElement>('#warnings')?.childElementCount)).toBe(0);
	});
});

describe('#validateURL()', () => {
	// Setup work before each test
	beforeEach(async () => {
		await jestPuppeteer.resetPage();

		await page.goto(`http://localhost:8080/`, {
			waitUntil: 'load',
		});

		await page.select('#method', 'validateURL');
	});

	// Wait after each test, see "Note" section under https://jigsaw.w3.org/css-validator/manual.html#expert
	afterEach(() => new Promise<void>((resolve) => setTimeout(resolve, 1000)));

	// Tests
	it('Loads', async () => {
		await expect(page.title()).resolves.toMatch('Hello world!');
	});

	it('Returns the validity', async () => {
		await page.type(
			'#custom-css',
			'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/valid.css'
		);
		await page.click('#make-call');

		await waitForResponse();
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
	});

	it('Includes errors present in the response on the result', async () => {
		await page.type(
			'#custom-css',
			'https://rawcdn.githack.com/sparksuite/w3c-css-validator/76341fda26fd16021155ea853d6e4d7db0e194c4/public/css/error.css'
		);
		await page.click('#make-call');

		await waitForResponse({ expectErrors: true });
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('false');
		expect(
			await page.evaluate(() => document.querySelector<HTMLUListElement>('#errors')?.childElementCount)
		).toBeGreaterThan(0);
	});

	it('Includes warnings present in the response on the result when options specify a warning level', async () => {
		await page.type(
			'#custom-css',
			'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/warning.css'
		);
		await page.select('#warning-level', '3');
		await page.click('#make-call');

		await waitForResponse({ expectWarnings: true });
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
		expect(
			await page.evaluate(() => document.querySelector<HTMLUListElement>('#warnings')?.childElementCount)
		).toBeGreaterThan(0);
	});

	it('Does not include warnings on the result when warnings aren’t enabled', async () => {
		await page.type(
			'#custom-css',
			'https://rawcdn.githack.com/sparksuite/w3c-css-validator/6cf7b194b4f0b246678ed5101a2b6f0fb2918361/public/css/warning.css'
		);
		await page.select('#warning-level', '0');
		await page.click('#make-call');

		await waitForResponse();
		expect(await page.evaluate(() => document.querySelector<HTMLHeadingElement>('#is-valid')?.innerText)).toBe('true');
		expect(await page.evaluate(() => document.querySelector<HTMLUListElement>('#warnings')?.childElementCount)).toBe(0);
	});
});
