const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	output: {
		filename: "[name].[chunkhash].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks: "all"
	    }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: "url-loader?limit=10000",
			}, 
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: "file-loader",
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css"
		})
	]
};