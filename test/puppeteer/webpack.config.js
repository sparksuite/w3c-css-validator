const path = require('path');

module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			https: false,
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
