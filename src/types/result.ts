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

export interface ValidateURLResultBase {
	valid: boolean;
	errors: {
		line: number;
		url: string | null;
		message: string;
	}[];
}

export interface ValidateURLResultWithWarnings extends ValidateURLResultBase {
	warnings: {
		line: number;
		url: string | null;
		level: 1 | 2 | 3;
		message: string;
	}[];
}

export interface ValidateURLResultWithoutWarnings extends ValidateURLResultBase {
	warnings?: never;
}

export type ValidateURLResult = ValidateURLResultWithWarnings | ValidateURLResultWithoutWarnings;
