// Imports
import retrieveValidation from './retrieve-validation';

// Define types
interface ValidateTextOptionsBase {
	medium?: 'all' | 'braille' | 'embossed' | 'handheld' | 'print' | 'projection' | 'screen' | 'speech' | 'tty' | 'tv';
}

interface ValidateTextOptionsWithoutWarnings extends ValidateTextOptionsBase {
	warningLevel?: 0;
}

interface ValidateTextOptionsWithWarnings extends ValidateTextOptionsBase {
	warningLevel: 1 | 2 | 3;
}

type ValidateTextOptions = ValidateTextOptionsWithWarnings | ValidateTextOptionsWithoutWarnings;

interface ValidateTextResultBase {
	valid: boolean;
	errors: {
		line: number;
		message: string;
	}[];
}

interface ValidateTextResultWithWarnings extends ValidateTextResultBase {
	warnings: {
		line: number;
		level: 1 | 2 | 3;
		message: string;
	}[];
}

interface ValidateTextResultWithoutWarnings extends ValidateTextResultBase {
	warnings?: never;
}

type ValidateTextResult = ValidateTextResultWithWarnings | ValidateTextResultWithoutWarnings;

// Validates a string of CSS
async function validateText(
	textToValidate: string,
	options?: ValidateTextOptionsWithoutWarnings
): Promise<ValidateTextResultWithoutWarnings>;
async function validateText(
	textToValidate: string,
	options: ValidateTextOptionsWithWarnings
): Promise<ValidateTextResultWithWarnings>;
async function validateText(textToBeValidated: string, options?: ValidateTextOptions): Promise<ValidateTextResult> {
	// Build URL for fetching
	const params = {
		text: encodeURIComponent(textToBeValidated),
		usermedium: options?.medium ?? 'all',
		warning: options?.warningLevel ? options.warningLevel - 1 : 'no',
		output: 'application/json',
	};

	const url = `https://jigsaw.w3.org/css-validator/validator?${Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&')}`;

	// Call W3C CSS Validator API and store response
	const cssValidationResponse = await retrieveValidation(url);

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
			message: error.message,
		});
	});

	if ('warnings' in result) {
		cssValidationResponse.warnings?.forEach((warning) => {
			result.warnings.push({
				line: warning.line,
				message: warning.message,
				level: (warning.level + 1) as 1 | 2 | 3,
			});
		});
	}

	// Return
	return result;
}

export default validateText;
