const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	entry: {
		test: "./src/test/index.js"
	},
	optimization: {
		minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "test.html",
			template: "./src/html/test.html",
			chunks: ["vendor", "test"]
		})
	]
});