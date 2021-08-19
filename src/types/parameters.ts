import { Options } from './options';

interface ParametersBase {
	medium: Options['medium'];
	warningLevel: Options['warningLevel'];
}

interface TextParameters extends ParametersBase {
	text: string;
	uri?: never;
}

interface URIParameters extends ParametersBase {
	uri: string;
	text?: never;
}

export type Parameters = TextParameters | URIParameters;
