// Imports
import cssValidator from 'w3c-css-validator';
import testValidateText from '../../src/validate-text.test';
import testValidateURL from '../../src/validate-url.test';

// Tests
testValidateText(cssValidator.validateText);
testValidateURL(cssValidator.validateURL);
