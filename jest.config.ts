import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	displayName: 'Test suite',
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	verbose: true,
	preset: 'ts-jest',
	resolver: 'jest-ts-webcompat-resolver',
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	testEnvironment: 'node',
};

export default config;
