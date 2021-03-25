import { Config } from 'rugged';

const config: Config = {
	testInParallel: false, // This way, we don't exceed the API request limit
};

export default config;
