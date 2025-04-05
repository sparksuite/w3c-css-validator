interface OptionsBase {
	medium?: 'all' | 'braille' | 'embossed' | 'handheld' | 'print' | 'projection' | 'screen' | 'speech' | 'tty' | 'tv';
	timeout?: number;
	profile?:
		| 'none'
		| 'css1'
		| 'css2'
		| 'css21'
		| 'css3'
		| 'css3svg'
		| 'svg'
		| 'svgbasic'
		| 'svgtiny'
		| 'mobile'
		| 'atsc-tv'
		| 'tv';
}

export interface OptionsWithoutWarnings extends OptionsBase {
	warningLevel?: 0;
}

export interface OptionsWithWarnings extends OptionsBase {
	warningLevel: 1 | 2 | 3;
}

export type Options = OptionsWithWarnings | OptionsWithoutWarnings;
