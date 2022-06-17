import type { Config } from '@jest/types';
// @ts-expect-error: Missing types
import presetTSJest from 'ts-jest/jest-preset';
import merge from 'merge';

const config: Config.InitialOptions = merge.recursive(presetTSJest, {
	displayName: 'Browser environment',
	testMatch: ['<rootDir>/*.test.ts'],
	preset: 'jest-puppeteer',
	verbose: true,
	testTimeout: 15000,
});

export default config;
