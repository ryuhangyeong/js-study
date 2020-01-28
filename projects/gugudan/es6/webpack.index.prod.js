const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	entry: {
		index: "./src/js/index.js"
	},
	optimization: {
		minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/html/index.html",
			chunks: ["vendor", "index"]
		})
	]
});