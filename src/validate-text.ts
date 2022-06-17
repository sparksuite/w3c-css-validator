// Imports
import retrieveValidation from './retrieve-validation';
import { OptionsWithoutWarnings, OptionsWithWarnings, Options } from './types/options';
import {
	ValidateTextResultWithoutWarnings,
	ValidateTextResultWithWarnings,
	ValidateTextResult,
	ValidateTextResultBase,
} from './types/result';

// Validates a string of CSS
async function validateText(
	textToValidate: string,
	options?: OptionsWithoutWarnings
): Promise<ValidateTextResultWithoutWarnings>;
async function validateText(
	textToValidate: string,
	options: OptionsWithWarnings
): Promise<ValidateTextResultWithWarnings>;
async function validateText(textToBeValidated: string, options?: Options): Promise<ValidateTextResult> {
	// Validations
	if (!textToBeValidated) {
		throw new Error('You must pass in text to be validated');
	}

	if (typeof textToBeValidated !== 'string') {
		throw new Error('The text to be validated must be a string');
	}

	// Call W3C CSS Validator API and store response
	const cssValidationResponse = await retrieveValidation(
		'GET',
		{
			text: textToBeValidated,
			medium: options?.medium,
			warningLevel: options?.warningLevel,
		},
		options?.timeout ?? 10000
	);

	// Build result
	const base: ValidateTextResultBase = {
		valid: false,
		errors: [],
	};
	const result: ValidateTextResultWithWarnings | ValidateTextResultBase = options?.warningLevel
		? {
				...base,
				warnings: [],
		  }
		: base;

	result.valid = cssValidationResponse.validity;

	cssValidationResponse.errors?.forEach((error) => {
		result.errors.push({
			line: error.line,
			message: error.message.replace(/[ :]+$/, '').trim(),
		});
	});

	if ('warnings' in result) {
		cssValidationResponse.warnings?.forEach((warning) => {
			result.warnings.push({
				line: warning.line,
				message: warning.message.replace(/[ :]+$/, '').trim(),
				level: (warning.level + 1) as 1 | 2 | 3,
			});
		});
	}

	// Return
	return result;
}

export default validateText;
