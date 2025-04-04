// Imports
import retrieveValidation from './retrieve-validation';
import { OptionsWithoutWarnings, OptionsWithWarnings, Options } from './types/options';
import {
	ValidateURLResultWithoutWarnings,
	ValidateURLResultWithWarnings,
	ValidateURLResult,
	ValidateURLResultBase,
} from './types/result';

// Validates a string of CSS
async function validateURL(
	urlToBeValidated: string,
	options?: OptionsWithoutWarnings
): Promise<ValidateURLResultWithoutWarnings>;
async function validateURL(
	urlToBeValidated: string,
	options: OptionsWithWarnings
): Promise<ValidateURLResultWithWarnings>;
async function validateURL(urlToBeValidated: string, options?: Options): Promise<ValidateURLResult> {
	// Validations
	if (!urlToBeValidated) {
		throw new Error('You must pass in a URL to be validated');
	}

	if (typeof urlToBeValidated !== 'string') {
		throw new Error('The URL to be validated must be a string');
	}

	// Call W3C CSS Validator API and store response
	const cssValidationResponse = await retrieveValidation(
		'GET',
		{
			url: urlToBeValidated,
			medium: options?.medium,
			warningLevel: options?.warningLevel,
			profile: options?.profile,
		},
		options?.timeout ?? 10000
	);

	// Build result
	const base: ValidateURLResultBase = {
		valid: false,
		errors: [],
	};
	const result: ValidateURLResultWithWarnings | ValidateURLResultBase = options?.warningLevel
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
			url: error.source ?? null,
		});
	});

	if ('warnings' in result) {
		cssValidationResponse.warnings?.forEach((warning) => {
			result.warnings.push({
				line: warning.line,
				message: warning.message.replace(/[ :]+$/, '').trim(),
				level: (warning.level + 1) as 1 | 2 | 3,
				url: warning.source ?? null,
			});
		});
	}

	// Return
	return result;
}

export default validateURL;
