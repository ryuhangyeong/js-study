const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = merge(common, {
	entry: {
		test: "./src/test/index.js"
	},
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: { contentBase: './dist' },
	plugins: [
		new HtmlWebpackPlugin({
			filename: "test.html",
			template: "./src/html/test.html",
			chunks: ["vendor", "test"]
		}),
		new FlowBabelWebpackPlugin()
	]
});