const path = require('path');
const webpack = require('webpack');

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
			http: false,
			url: false,
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new webpack.DefinePlugin({
			'window.CSS_VALIDATOR_URL': JSON.stringify(process.env.CSS_VALIDATOR_URL),
		}),
	],
};
