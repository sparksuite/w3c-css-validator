import { Options } from './options';

interface ParametersBase {
	usermedium: Options['medium'];
	warning: Options['warningLevel'] | 'no';
}

interface TextParameters extends ParametersBase {
	text: string;
	url?: never;
}

interface URLParameters extends ParametersBase {
	uri: string;
	text?: never;
}

export type W3CValidatorParameters = TextParameters | URLParameters;
