import { Options } from './options';

interface ParametersBase {
	medium: Options['medium'];
	warningLevel: Options['warningLevel'];
}

interface TextParameters extends ParametersBase {
	text: string;
	url?: never;
}

interface URLParameters extends ParametersBase {
	url: string;
	text?: never;
}

export type Parameters = TextParameters | URLParameters;