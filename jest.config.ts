import type { Config } from '@jest/types';
// @ts-expect-error: Missing types
import presetTSJest from 'ts-jest/jest-preset';
import presetJestPuppeteer from 'jest-puppeteer/jest-preset.json';
import merge from 'merge';

const config: Config.InitialOptions = {
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: ['<rootDir>/src/**'],
	verbose: true,
	projects: [
		{
			displayName: 'Jest',
			preset: 'ts-jest',
			testMatch: ['<rootDir>/test/*.test.ts'],
		},
		merge.recursive(presetTSJest, presetJestPuppeteer, {
			displayName: 'Puppeteer',
			testMatch: ['<rootDir>/test/puppeteer/test/*.test.ts'],
		}),
	],
};

export default config;
