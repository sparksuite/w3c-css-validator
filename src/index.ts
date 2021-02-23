// Imports
import validateText from './validate-text';

// Define types
export interface W3CCSSValidatorResponse {
	cssvalidation: {
		validity: boolean;
		errors?: {
			line: number;
			message: string;
		}[];
		warnings?: {
			line: number;
			level: 0 | 1 | 2;
			message: string;
		}[];
	};
}

// Validates CSS using W3C's public CSS validator service
const cssValidator = {
	validateText,
};

export default cssValidator;
