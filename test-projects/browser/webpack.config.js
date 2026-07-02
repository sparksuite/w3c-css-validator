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
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new webpack.DefinePlugin({
			__CSS_VALIDATOR_URL__: JSON.stringify(process.env.CSS_VALIDATOR_URL),
		}),
	],
};
