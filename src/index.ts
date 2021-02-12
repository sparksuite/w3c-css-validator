// Imports
import {
	CSSValidator,
	ValidateTextOptions,
	ValidateTextResultBase,
	ValidateTextResultWithWarnings,
	W3CCSSValidatorResponse,
} from './types';
import * as https from 'https';

// Validates CSS using W3C's public CSS validator service
const cssValidator: CSSValidator = {
	// Validates a string of CSS
	async validateText(textToBeValidated: string, options?: ValidateTextOptions): Promise<any> {
		// Build URL for fetching
		const url = `https://jigsaw.w3.org/css-validator/validator?text=${encodeURIComponent(
			textToBeValidated
		)}&usermedium=${options?.medium ?? 'all'}&warning=${options?.warningLevel ? options.warningLevel - 1 : 'no'}&output=application/json`;

		// Build result and initialize response
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
		let cssValidationResponse: W3CCSSValidatorResponse['cssvalidation'] | null = null;

		// Detect if fetch is available and retrieve validation response accordingly
		if (typeof window?.fetch === 'function') {
			const res = await fetch(url);
			const data = (await res.json()) as W3CCSSValidatorResponse;

			cssValidationResponse = data.cssvalidation;
		} else {
			const retrieveValidationResponse = async (): Promise<W3CCSSValidatorResponse['cssvalidation']> => {
				return new Promise((resolve) => {
					https.get(url, (res) => {
						let data = '';

						res.on('data', (chunk) => {
							data += chunk;
						});

						res.on('end', () => {
							resolve((JSON.parse(data) as W3CCSSValidatorResponse).cssvalidation);
						});
					});
				});
			};

			cssValidationResponse = await retrieveValidationResponse();
		}

		// Throw if no validation response
		if (!cssValidationResponse) {
			throw new Error('Something went wrong while retrieving data from W3C CSS Validator');
		}

		// Assign validity and errors
		result.valid = cssValidationResponse.validity;
		cssValidationResponse.errors?.forEach((error) => {
			result.errors.push({
				line: error.line,
				message: error.message,
			});
		});

		// Assign warnings if called for
		if ('warnings' in result) {
			cssValidationResponse.warnings?.forEach((warning) => {
				result.warnings.push({
					line: warning.line,
					message: warning.message,
					level: warning.level,
				});
			});
		}

		// Return the result
		return result;
	},
};

export default cssValidator;
