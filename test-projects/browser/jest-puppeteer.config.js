const { launch } = require('puppeteer');

module.exports = {
	server: {
		command: 'node ./server.js',
		port: 8080,
	},
	launch: {
		executablePath: process.env.PUPPETEER_EXEC_PATH,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
};
