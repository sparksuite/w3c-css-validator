export interface ValidateTextResultBase {
	valid: boolean;
	errors: {
		line: number;
		message: string;
	}[];
}

export interface ValidateTextResultWithWarnings extends ValidateTextResultBase {
	warnings: {
		line: number;
		level: 1 | 2 | 3;
		message: string;
	}[];
}

export interface ValidateTextResultWithoutWarnings extends ValidateTextResultBase {
	warnings?: never;
}

export type ValidateTextResult = ValidateTextResultWithWarnings | ValidateTextResultWithoutWarnings;
