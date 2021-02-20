interface ValidateTextOptionsBase {
	medium?: 'all' | 'braille' | 'embossed' | 'handheld' | 'print' | 'projection' | 'screen' | 'speech' | 'tty' | 'tv';
}

interface ValidateTextOptionsWithoutWarnings extends ValidateTextOptionsBase {
	warningLevel?: 0;
}

interface ValidateTextOptionsWithWarnings extends ValidateTextOptionsBase {
	warningLevel: 1 | 2 | 3;
}

export interface W3CCSSValidatorResponse {
	cssvalidation: {
		validity: boolean;
		errors?: {
			line: number;
			message: string;
		}[];
		warnings?: {
			line: number;
			level: 1 | 2 | 3;
			message: string;
		}[];
	};
}

export type ValidateTextOptions = ValidateTextOptionsWithWarnings | ValidateTextOptionsWithoutWarnings;

export interface ValidateTextResultBase {
	valid: boolean;
	errors: {
		line: number;
		message: string;
	}[];
}

export type ValidateTextResultWithWarnings = ValidateTextResultBase & {
	warnings: {
		line: number;
		level: 1 | 2 | 3;
		message: string;
	}[];
};

export interface CSSValidator {
	validateText(textToValidate: string, options?: ValidateTextOptionsWithoutWarnings): Promise<ValidateTextResultBase>;
	validateText(
		textToValidate: string,
		options: ValidateTextOptionsWithWarnings
	): Promise<ValidateTextResultWithWarnings>;
}