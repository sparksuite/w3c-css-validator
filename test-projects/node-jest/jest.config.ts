import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	displayName: 'Full test suite',
	verbose: true,
	preset: 'ts-jest',
	testMatch: ['<rootDir>/*.test.ts'],
};

export default config;
