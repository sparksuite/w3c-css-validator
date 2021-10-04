import type { Config } from '@jest/types';
// @ts-expect-error: Missing types
import presetTSJest from 'ts-jest/jest-preset';
import presetJestPuppeteer from 'jest-puppeteer/jest-preset.json';
import merge from 'merge';

const config: Config.InitialOptions = merge.recursive(presetTSJest, presetJestPuppeteer, {
	displayName: 'Browser environment',
	testMatch: ['<rootDir>/*.test.ts'],
	verbose: true,
	testTimeout: 15000,
});

export default config;
