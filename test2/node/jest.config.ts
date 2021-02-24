import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: ['<rootDir>/src/**'],
	displayName: 'Node.js tests',
	verbose: true,
	preset: 'ts-jest',
	testMatch: ['<rootDir>/*.test.ts'],
};

export default config;
