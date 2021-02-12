interface ValidateTextOptionsBase {
	medium?: 'all' | 'braille' | 'embossed' | 'handheld' | 'print' | 'projection' | 'screen' | 'speech' | 'tty' | 'tv';
}

type ValidateTextOptionsWithBaseWarning = ValidateTextOptionsBase & {
	warningLevel?: 0;
};

type ValidateTextOptionsWithElevatedWarning = ValidateTextOptionsBase & {
	warningLevel: 1 | 2 | 3;
};

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

export type ValidateTextOptions = ValidateTextOptionsWithElevatedWarning | ValidateTextOptionsWithBaseWarning;

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
	validateText(unvalidatedStr: string, options?: ValidateTextOptionsWithBaseWarning): Promise<ValidateTextResultBase>;
	validateText(
		unvalidatedStr: string,
		options: ValidateTextOptionsWithElevatedWarning
	): Promise<ValidateTextResultWithWarnings>;
}
