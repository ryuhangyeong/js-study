const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = merge(common, {
	entry: {
		index: "./src/js/index.js"
	},
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: { contentBase: './dist' },
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "eslint-loader",
				options: {
					fix: true
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/html/index.html",
			chunks: ["vendor", "index"]
		}),
		new FlowBabelWebpackPlugin()
	]
});