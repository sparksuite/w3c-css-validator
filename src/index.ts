// Imports
import validateText from './validate-text';
import validateURL from './validate-url';

// Validates CSS using W3C's public CSS validator service
const cssValidator = {
	validateText,
	validateURL,
};

export = cssValidator;
