// Imports
import { Options } from './types/options';

// Define supported mediums
const allowedMediums: Options['medium'][] = [
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

// Define supported warning levels
const allowedWarningLevels: Options['warningLevel'][] = [0, 1, 2, 3];

// Define supported profiles
const allowedProfiles: Options['profile'][] = [
	'none',
	'css1',
	'css2',
	'css21',
	'css3',
	'css3svg',
	'svg',
	'svgbasic',
	'svgtiny',
	'mobile',
	'atsc-tv',
	'tv',
];

// Helper function that validates the supported options
function validateOptions(options?: Options): void {
	if (options) {
		// Validate medium option
		if (options.medium && !allowedMediums.includes(options.medium)) {
			throw new Error(`The medium must be one of the following: ${allowedMediums.join(', ')}`);
		}

		// Validate warning level option
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

		// Validate profile option
		if (options.profile && !allowedProfiles.includes(options.profile)) {
			throw new Error(`The profile must be one of the following: ${allowedProfiles.join(', ')}`);
		}
	}
}

export default validateOptions;
