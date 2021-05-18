// Imports
import retrieveValidation from './retrieve-validation';

// Define types
interface ValidateTextOptionsBase {
	medium?: 'all' | 'braille' | 'embossed' | 'handheld' | 'print' | 'projection' | 'screen' | 'speech' | 'tty' | 'tv';
	timeout?: number;
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
	// Validations
	if (!textToBeValidated) {
		throw new Error('You must pass in text to be validated');
	}

	if (typeof textToBeValidated !== 'string') {
		throw new Error('The text to be validated must be a string');
	}

	if (options) {
		// Validate medium option
		const allowedMediums: typeof options['medium'][] = [
			'all',
			'braille',
			'embossed',
			'handheld',
			'print',
			'projection',
			'screen',
			'speech',
			'tty',
			'tv',
		];

		if (options.medium && !allowedMediums.includes(options.medium)) {
			throw new Error(`The medium must be one of the following: ${allowedMediums.join(', ')}`);
		}

		const allowedWarningLevels: typeof options['warningLevel'][] = [0, 1, 2, 3];

		if (options.warningLevel && !allowedWarningLevels.includes(options.warningLevel)) {
			throw new Error(`The warning level must be one of the following: ${allowedWarningLevels.join(', ')}`);
		}

		// Validate timeout option
		if (options.timeout !== undefined && !Number.isInteger(options.timeout)) {
			throw new Error('The timeout must be an integer');
		}

		if (options.timeout && options.timeout < 0) {
			throw new Error('The timeout must be a positive integer');
		}
	}

	// Build URL for fetching
	const params = {
		text: encodeURIComponent(textToBeValidated),
		usermedium: options?.medium ?? 'all',
		warning: options?.warningLevel ? options.warningLevel - 1 : 'no',
		output: 'application/json',
		profile: 'css3',
	};

	const url = `https://jigsaw.w3.org/css-validator/validator?${Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join('&')}`;

	// Call W3C CSS Validator API and store response
	const cssValidationResponse = await retrieveValidation(url, options?.timeout ?? 10000);

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
