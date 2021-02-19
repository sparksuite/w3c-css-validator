// Imports
import helloWorld from 'w3c-css-validator';

// Wait until DOM content is available to attempt to make changes
document.addEventListener('DOMContentLoaded', () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	document.title = helloWorld();
});
