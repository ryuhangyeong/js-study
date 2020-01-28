const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		index: './src/js/index.js',
		tests: './src/js/tests/index.js'
	},
	output: {
		filename: '[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		splitChunks: {
			name: 'vendors',
			chunks: 'all'
	    }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader?limit=10000',
			}, 
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			chunks: ['vendors', 'index']
		}),
		new HtmlWebpackPlugin({
			filename: 'tests.html',
			template: './src/html/tests.html',
			chunks: ['vendors', 'tests']
		}),
		new CleanWebpackPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
	        jQuery: 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
	]
}